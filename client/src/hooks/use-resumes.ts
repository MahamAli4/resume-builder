import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertResume } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useResumes() {
  return useQuery({
    queryKey: [api.resumes.list.path],
    queryFn: async () => {
      const res = await fetch(api.resumes.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch resumes");
      return api.resumes.list.responses[200].parse(await res.json());
    },
  });
}

export function useResume(id: number) {
  return useQuery({
    queryKey: [api.resumes.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.resumes.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) throw new Error("Resume not found");
      if (!res.ok) throw new Error("Failed to fetch resume");
      return api.resumes.get.responses[200].parse(await res.json());
    },
    enabled: !!id && !isNaN(id),
  });
}

export function useCreateResume() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertResume) => {
      const res = await fetch(api.resumes.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create resume");
      }
      return api.resumes.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.resumes.list.path] });
      toast({
        title: "Resume Created",
        description: "Your new resume is ready to edit.",
      });
    },
    onError: (error) => {
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

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & Partial<InsertResume>) => {
      const url = buildUrl(api.resumes.update.path, { id });
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update resume");
      return api.resumes.update.responses[200].parse(await res.json());
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.resumes.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.resumes.get.path, data.id] });
      toast({
        title: "Saved",
        description: "Resume changes saved successfully.",
      });
    },
    onError: (error) => {
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

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.resumes.delete.path, { id });
      const res = await fetch(url, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Failed to delete resume");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.resumes.list.path] });
      toast({
        title: "Deleted",
        description: "Resume has been permanently deleted.",
      });
    },
  });
}
