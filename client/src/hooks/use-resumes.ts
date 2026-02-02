import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export interface Resume {
  id: string; // Firestore IDs are strings
  title: string;
  templateId?: string;
  content: any; // Using any for flexibility with existing structure
  updatedAt: string;
  thumbnail?: string;
}

export function useResumes() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["resumes", user?.uid],
    queryFn: async () => {
      if (!user) {
        console.log("useResumes: No user found, returning empty array");
        return [];
      }
      try {
        console.log("useResumes: Fetching resumes for user:", user.uid);
        const q = query(collection(db, "users", user.uid, "resumes"));
        const snapshot = await getDocs(q);
        const resumes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Resume[];
        console.log("useResumes: Fetched", resumes.length, "resumes");
        return resumes;
      } catch (err) {
        console.error("useResumes: Error fetching resumes:", err);
        throw err;
      }
    },
    enabled: !!user,
  });
}

export function useResume(id: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["resume", id],
    queryFn: async () => {
      if (!user || !id) {
        console.error("useResume: Missing user or resume ID", { uid: user?.uid, id });
        throw new Error("Missing user or resume ID");
      }
      try {
        console.log("useResume: Fetching resume:", id, "for user:", user.uid);
        const docRef = doc(db, "users", user.uid, "resumes", id);
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()) {
          console.error("useResume: Resume not found:", id);
          throw new Error("Resume not found");
        }
        const data = { id: snapshot.id, ...snapshot.data() } as Resume;
        console.log("useResume: Successfully fetched resume:", id);
        return data;
      } catch (err) {
        console.error("useResume: Error fetching resume:", err);
        throw err;
      }
    },
    enabled: !!user && !!id,
  });
}

export function useCreateResume() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!user) {
        console.error("useCreateResume: User not authenticated");
        throw new Error("User not authenticated");
      }

      try {
        console.log("useCreateResume: Creating resume for user:", user.uid);
        // Add default fields if missing
        const resumeData = {
          title: data.title || "Untitled Resume",
          content: data.content || {},
          templateId: data.templateId || "modern",
          updatedAt: new Date().toISOString(),
          ...data
        };

        // Add a 10-second timeout to the Firestore call
        const createPromise = addDoc(collection(db, "users", user.uid, "resumes"), resumeData);
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Firestore operation timed out. Please check your internet connection or Firebase project setup.")), 10000)
        );

        const docRef = await Promise.race([createPromise, timeoutPromise]) as any;
        console.log("useCreateResume: Successfully created resume with ID:", docRef.id);
        return { id: docRef.id, ...resumeData };
      } catch (err) {
        console.error("useCreateResume: Error creating resume:", err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast({
        title: "Resume Created",
        description: "Your new resume is ready to edit.",
      });
    },
    onError: (error: any) => {
      console.error("useCreateResume Mutation Error:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateResume() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string } & any) => {
      if (!user) throw new Error("User not authenticated");
      try {
        console.log("useUpdateResume: Updating resume:", id);
        const docRef = doc(db, "users", user.uid, "resumes", id);
        await updateDoc(docRef, {
          ...data,
          updatedAt: new Date().toISOString(),
        });
        console.log("useUpdateResume: Successfully updated resume:", id);
        return { id, ...data };
      } catch (err) {
        console.error("useUpdateResume: Error updating resume:", err);
        throw err;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      queryClient.invalidateQueries({ queryKey: ["resume", data.id] });
      toast({
        title: "Saved",
        description: "Resume changes saved successfully.",
      });
    },
    onError: (error: any) => {
      console.error("useUpdateResume Mutation Error:", error);
      toast({
        title: "Save Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteResume() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!user) throw new Error("User not authenticated");
      try {
        console.log("useDeleteResume: Deleting resume:", id);
        await deleteDoc(doc(db, "users", user.uid, "resumes", id));
        console.log("useDeleteResume: Successfully deleted resume:", id);
      } catch (err) {
        console.error("useDeleteResume Error:", err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast({
        title: "Deleted",
        description: "Resume has been permanently deleted.",
      });
    },
    onError: (error: any) => {
      console.error("useDeleteResume Mutation Error:", error);
      toast({
        title: "Delete Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
