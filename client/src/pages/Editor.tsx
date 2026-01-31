import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReactToPrint } from "react-to-print";
import { useResume, useUpdateResume } from "@/hooks/use-resumes";
import { resumeContentSchema, type ResumeContent } from "@shared/schema";
import { ResumeForm } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ArrowLeft, Download, Save, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function Editor() {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useLocation();
  const resumeId = parseInt(id || "0");
  const { toast } = useToast();

  const { data: resume, isLoading, isError } = useResume(resumeId);
  const updateResume = useUpdateResume();

  const [title, setTitle] = useState("");
  const [template, setTemplate] = useState("modern");
  const [previewContent, setPreviewContent] = useState<ResumeContent | null>(null);

  const form = useForm<ResumeContent>({
    resolver: zodResolver(resumeContentSchema),
    defaultValues: resume?.content as ResumeContent, // Typescript cast safely handled by effect
  });

  // Printing Logic
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: title || "Resume",
  });

  // Sync data on load
  useEffect(() => {
    if (resume) {
      form.reset(resume.content as ResumeContent);
      setTitle(resume.title);
      setTemplate(resume.templateId);
      setPreviewContent(resume.content as ResumeContent);
    }
  }, [resume, form]);

  // Real-time preview update
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value) {
        // Debounce slightly if needed, but for local state it's usually fine
        setPreviewContent(value as ResumeContent);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Auto-save logic (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (previewContent && resume && (
        JSON.stringify(previewContent) !== JSON.stringify(resume.content) || 
        title !== resume.title || 
        template !== resume.templateId
      )) {
        handleSave(true);
      }
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(timeoutId);
  }, [previewContent, title, template]);


  const handleSave = (silent = false) => {
    const content = form.getValues();
    updateResume.mutate({
      id: resumeId,
      title,
      templateId: template,
      content,
    }, {
      onSuccess: () => {
        if (!silent) {
          toast({ title: "Saved successfully" });
        }
      }
    });
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;
  if (isError) return <div className="h-screen flex items-center justify-center">Resume not found</div>;
  if (!previewContent) return null;

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      
      {/* Top Toolbar */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-4 shrink-0 shadow-sm z-10 print:hidden">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" title="Back to Dashboard">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div className="h-6 w-px bg-slate-200" />
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-64 border-none shadow-none font-semibold text-lg bg-transparent hover:bg-slate-50 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 mr-4">
            <span className="text-sm text-slate-500 font-medium">Template:</span>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="classic">Classic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" onClick={() => handleSave(false)} disabled={updateResume.isPending}>
            {updateResume.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save
          </Button>
          
          <Button onClick={handlePrint} className="bg-slate-900 hover:bg-slate-800">
            <Printer className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Editor Pane (Left) */}
        <div className="w-1/2 lg:w-[45%] max-w-2xl bg-slate-50 border-r flex flex-col print:hidden">
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <ResumeForm form={form} />
          </div>
        </div>

        {/* Preview Pane (Right) */}
        <div className="flex-1 bg-slate-200/50 overflow-y-auto p-8 flex justify-center items-start print:p-0 print:bg-white print:overflow-visible print:block">
          {/* 
            Scale wrapper for smaller screens 
            We use a fixed width container to simulate A4 size
          */}
          <div className="print:w-full print:h-full">
            <div ref={componentRef} id="resume-preview">
               <ResumePreview 
                  data={previewContent} 
                  templateId={template} 
                  className="shadow-2xl print:shadow-none min-h-[297mm]" 
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
