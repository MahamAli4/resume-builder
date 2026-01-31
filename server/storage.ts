import { resumes, type Resume, type InsertResume } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Resumes
  getResumes(userId: string): Promise<Resume[]>;
  getResume(id: number): Promise<Resume | undefined>;
  createResume(resume: InsertResume): Promise<Resume>;
  updateResume(id: number, resume: Partial<InsertResume>): Promise<Resume>;
  deleteResume(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getResumes(userId: string): Promise<Resume[]> {
    return await db.select().from(resumes).where(eq(resumes.userId, userId));
  }

  async getResume(id: number): Promise<Resume | undefined> {
    const [resume] = await db.select().from(resumes).where(eq(resumes.id, id));
    return resume;
  }

  async createResume(insertResume: InsertResume & { userId: string }): Promise<Resume> {
    const [resume] = await db.insert(resumes).values(insertResume).returning();
    return resume;
  }

  async updateResume(id: number, updateData: Partial<InsertResume>): Promise<Resume> {
    const [resume] = await db
      .update(resumes)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(resumes.id, id))
      .returning();
    return resume;
  }

  async deleteResume(id: number): Promise<void> {
    await db.delete(resumes).where(eq(resumes.id, id));
  }
}

export const storage = new DatabaseStorage();
