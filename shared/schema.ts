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
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
});

export const resumeContentSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().default(""),
    email: z.string().default(""),
    phone: z.string().default(""),
    address: z.string().default(""),
    summary: z.string().default(""),
    profileImage: z.string().optional(),
  }).default({}),
  education: z.array(z.object({
    id: z.string(),
    school: z.string(),
    degree: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string().optional(),
  })).default([]),
  experience: z.array(z.object({
    id: z.string(),
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string().optional(),
  })).default([]),
  skills: z.array(z.string()).default([]),
  projects: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    link: z.string().optional(),
  })).default([]),
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true // userId is handled by backend from session
}).extend({
  content: resumeContentSchema
});

export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;
export type ResumeContent = z.infer<typeof resumeContentSchema>;
