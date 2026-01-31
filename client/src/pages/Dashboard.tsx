import { Link } from "wouter";
import { useResumes, useCreateResume, useDeleteResume } from "@/hooks/use-resumes";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
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
import { Loader2, Plus, FileText, Trash2, Edit, LogOut } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { data: resumes, isLoading } = useResumes();
  const createResume = useCreateResume();
  const deleteResume = useDeleteResume();

  const handleCreate = () => {
    createResume.mutate({
      title: "Untitled Resume",
      content: {
        personalInfo: { fullName: user?.firstName ? `${user.firstName} ${user.lastName || ''}` : "" },
        education: [],
        experience: [],
        skills: [],
        projects: []
      },
      templateId: "modern"
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
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-white p-1.5 rounded-lg">
              <FileText size={20} />
            </div>
            <span className="font-display font-bold text-xl text-slate-900">ResuMakers</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-slate-200">
              {user?.profileImageUrl ? (
                <img src={user.profileImageUrl} alt="Profile" className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                  {user?.firstName?.[0]}
                </div>
              )}
              <span className="text-sm font-medium text-slate-700">{user?.firstName}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => logout()}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">My Resumes</h1>
            <p className="text-slate-500 mt-1">Manage and edit your professional resumes.</p>
          </div>
          <Button onClick={handleCreate} disabled={createResume.isPending} className="shadow-lg shadow-primary/20">
            {createResume.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            Create New Resume
          </Button>
        </div>

        {resumes && resumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resumes.map((resume) => (
              <Card key={resume.id} className="group hover:shadow-xl transition-all duration-300 border-slate-200 overflow-hidden flex flex-col h-64">
                <Link href={`/editor/${resume.id}`} className="flex-1 bg-slate-100 relative overflow-hidden cursor-pointer">
                  {/* Thumbnail Placeholder - in a real app, generate screenshots */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-300 group-hover:scale-105 transition-transform duration-500">
                    <FileText size={64} strokeWidth={1} />
                  </div>
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
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No resumes yet</h3>
            <p className="text-slate-500 mb-6">Create your first resume to get started.</p>
            <Button onClick={handleCreate} variant="outline">
              Create Resume
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
