import { Link, useLocation } from "wouter";
import { useResumes, useCreateResume, useDeleteResume } from "@/hooks/use-resumes";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Plus, FileText, Trash2, Edit, LogOut, Search } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { data: resumes, isLoading } = useResumes();
  const createResume = useCreateResume();
  const deleteResume = useDeleteResume();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResumes = resumes?.filter((resume) =>
    resume.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    createResume.mutate({
      title: "Untitled Resume",
      content: {
        personalInfo: {
          fullName: "",
          jobTitle: "",
          email: "",
          phone: "",
          address: "",
          summary: "",
          socialLinks: []
        },
        education: [],
        experience: [],
        skills: [],
        projects: []
      },
      templateId: "modern"
    }, {
      onSuccess: (data) => {
        setLocation(`/editor/${data.id}`);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">My Resumes</h1>
            <p className="text-slate-500 mt-1">Manage and edit your professional resumes.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search resumes..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleCreate} disabled={createResume.isPending} className="shadow-lg shadow-primary/20 shrink-0">
              {createResume.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              Create New Resume
            </Button>
          </div>
        </div>

        {filteredResumes && filteredResumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResumes.map((resume) => (
              <Card key={resume.id} className="group hover:shadow-xl transition-all duration-300 border-slate-200 overflow-hidden flex flex-col h-64">
                <Link href={`/editor/${resume.id}`} className="flex-1 bg-white relative overflow-hidden cursor-pointer flex items-center justify-center p-2">
                  {resume.thumbnail ? (
                    <img
                      src={resume.thumbnail}
                      alt={resume.title}
                      className="w-full h-full object-contain shadow-sm group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center text-slate-300 group-hover:scale-105 transition-transform duration-500">
                      <FileText size={48} strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </Link>

                <CardFooter className="bg-white p-4 border-t border-slate-100 flex justify-between items-center relative z-10">
                  <div className="overflow-hidden">
                    <h3 className="font-semibold text-slate-900 truncate" title={resume.title}>
                      {resume.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Edited {formatDistanceToNow(new Date(resume.updatedAt || new Date()), { addSuffix: true })}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Link href={`/editor/${resume.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                        <Edit size={16} />
                      </Button>
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500">
                          <Trash2 size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete "{resume.title}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteResume.mutate(resume.id)}
                            className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              {searchQuery ? "No matching resumes found" : "No resumes yet"}
            </h3>
            <p className="text-slate-500 mb-6">
              {searchQuery ? "Try a different search term." : "Create your first resume to get started."}
            </p>
            {!searchQuery && (
              <Button onClick={handleCreate} variant="outline" disabled={createResume.isPending}>
                {createResume.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Create Resume
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
