import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { z } from "zod";
import { insertResumeSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Set up authentication first
  await setupAuth(app);
  registerAuthRoutes(app);

  // Resume Routes
  app.get(api.resumes.list.path, async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");
    // @ts-ignore
    const userId = req.user.claims.sub;
    const resumes = await storage.getResumes(userId);
    res.json(resumes);
  });

  app.get(api.resumes.get.path, async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");
    const resume = await storage.getResume(Number(req.params.id));
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    // Check ownership
    // @ts-ignore
    if (resume.userId !== req.user.claims.sub) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(resume);
  });

  app.post(api.resumes.create.path, async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");
    try {
      // Inject userId from session
      // @ts-ignore
      const userId = req.user.claims.sub;
      // We parse body but we need to override userId from the session, not the body (if present)
      // The schema omits userId, so we add it manually to the storage call
      const input = insertResumeSchema.parse({
        ...req.body,
        userId // This will be ignored by parse if omitted in schema, but we need it for storage
      });

      // But wait, insertResumeSchema omits userId. So 'input' won't have it.
      // We need to pass it to storage.createResume which expects InsertResume (which has userId? No, InsertResume is inferred from insertResumeSchema which OMITTED userId).
      // Actually shared/schema.ts says:
      // export const insertResumeSchema = createInsertSchema(resumes).omit({ ... userId: true ... })
      // So InsertResume type DOES NOT have userId.
      // But the table DOES have userId.
      // So storage.createResume needs to accept (InsertResume & { userId: string }) or similar.
      // Let's fix storage.ts types or just cast here.
      // Actually, storage.createResume expects InsertResume.
      // In server/storage.ts: createResume(insertResume: InsertResume)
      // But InsertResume (from schema) is missing userId.
      // So db.insert(resumes).values(insertResume) will fail because userId is missing.
      // I should update shared/schema.ts to NOT omit userId from the TYPE, but omit it from the Zod validation schema used for API input?
      // Or better: storage.createResume should take the full object required for DB insert.
      // Let's assume I cast it here.

      // @ts-ignore
      const resume = await storage.createResume({ ...input, userId });
      res.status(201).json(resume);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.put(api.resumes.update.path, async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");
    try {
      const existing = await storage.getResume(Number(req.params.id));
      if (!existing) return res.status(404).json({ message: 'Resume not found' });
      // @ts-ignore
      if (existing.userId !== req.user.claims.sub) return res.status(403).json({ message: 'Forbidden' });

      const input = insertResumeSchema.partial().parse(req.body);
      const resume = await storage.updateResume(Number(req.params.id), input);
      res.json(resume);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.resumes.delete.path, async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");
    const existing = await storage.getResume(Number(req.params.id));
    if (!existing) return res.status(404).json({ message: 'Resume not found' });
    // @ts-ignore
    if (existing.userId !== req.user.claims.sub) return res.status(403).json({ message: 'Forbidden' });

    await storage.deleteResume(Number(req.params.id));
    res.status(204).send();
  });

  return httpServer;
}
