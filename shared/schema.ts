import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./models/auth";
import { sql } from "drizzle-orm";

export * from "./models/auth";

export const resumes = sqliteTable("resumes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  content: text("content", { mode: "json" }).notNull(), // Stores the structured resume data
  templateId: text("template_id").notNull().default("modern"),
  thumbnail: text("thumbnail"), // Stores base64 preview
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});

export const resumeContentSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().default(""),
    jobTitle: z.string().default(""),
    email: z.string().default(""),
    phone: z.string().default(""),
    address: z.string().default(""),
    summary: z.string().default(""),
    profileImage: z.string().default(""),
    customText: z.string().default(""),
    socialLinks: z.array(z.object({
      platform: z.string().default(""),
      url: z.string().default(""),
    })).default([]),
  }).default({}),
  creationMode: z.enum(["manual", "magic"]).default("manual"),
  education: z.array(z.object({
    id: z.string(),
    school: z.string().default(""),
    degree: z.string().default(""),
    startDate: z.string().default(""),
    endDate: z.string().default(""),
    description: z.string().default(""),
  })).default([]),
  experience: z.array(z.object({
    id: z.string(),
    company: z.string().default(""),
    position: z.string().default(""),
    startDate: z.string().default(""),
    endDate: z.string().default(""),
    description: z.string().default(""),
  })).default([]),
  skills: z.array(z.string()).default([]),
  projects: z.array(z.object({
    id: z.string(),
    name: z.string().default(""),
    description: z.string().default(""),
    link: z.string().default(""),
  })).default([]),
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true
}).extend({
  content: resumeContentSchema,
  thumbnail: z.string().optional()
});

export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type ResumeContent = z.infer<typeof resumeContentSchema>;
