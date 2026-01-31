import { pgTable, text, serial, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./models/auth";

export * from "./models/auth";

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  content: jsonb("content").notNull(), // Stores the structured resume data
  templateId: text("template_id").notNull().default("modern"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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
