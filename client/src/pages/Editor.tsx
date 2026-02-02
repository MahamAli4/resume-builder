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
import { Loader2, ArrowLeft, Download, Save, Printer, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MagicImport } from "@/components/MagicImport";
import { Link } from "wouter";
import { toPng } from 'html-to-image';
import { Navbar } from "@/components/Navbar";

export default function Editor() {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useLocation();
  const resumeId = id || "";
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
    contentRef: componentRef,
    documentTitle: title || "Resume",
  });

  // Sync data on load
  useEffect(() => {
    if (resume) {
      form.reset(resume.content as ResumeContent);
      setTitle(resume.title);
      setTemplate(resume.templateId || "modern");
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


  const handleSave = async (silent = false, redirectToDashboard = false) => {
    try {
      const rawContent = form.getValues();
      const sanitizedContent = resumeContentSchema.parse(rawContent);

      // Generate thumbnail if it's a deliberate save
      let thumbnail = undefined;
      if (!silent && componentRef.current) {
        try {
          thumbnail = await toPng(componentRef.current, {
            quality: 0.5,
            pixelRatio: 0.5, // Smaller thumbnail
            width: 794, // Standard A4 ratio
            height: 1123,
          });
        } catch (thumbErr) {
          console.error("Thumbnail generation failed:", thumbErr);
        }
      }

      updateResume.mutate({
        id: resumeId,
        title,
        templateId: template,
        content: sanitizedContent,
        thumbnail: thumbnail,
      }, {
        onSuccess: () => {
          if (!silent) {
            toast({ title: "Saved successfully" });
          }
          if (redirectToDashboard) {
            setLocation("/dashboard");
          }
        }
      });
    } catch (err) {
      console.error("Validation error before save:", err);
      if (!silent) {
        toast({
          title: "Save Failed",
          description: "Invalid resume data structure.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDownloadImage = async () => {
    if (!componentRef.current) return;
    try {
      const dataUrl = await toPng(componentRef.current, {
        quality: 1,
        pixelRatio: 2, // High res for download
      });
      const link = document.createElement('a');
      link.download = `${title || 'resume'}.png`;
      link.href = dataUrl;
      link.click();
      toast({ title: "Image Downloaded", description: "Your resume has been saved as a PNG." });
    } catch (err) {
      console.error("Image generation failed:", err);
      toast({ title: "Download Failed", description: "Could not generate image.", variant: "destructive" });
    }
  };

  const handleImport = (newData: Partial<ResumeContent>) => {
    const currentValues = form.getValues();
    const merged = {
      ...currentValues,
      personalInfo: { ...currentValues.personalInfo, ...newData.personalInfo },
      skills: [...(currentValues.skills || []), ...(newData.skills || [])],
      experience: [...(currentValues.experience || []), ...(newData.experience || [])],
      education: [...(currentValues.education || []), ...(newData.education || [])],
      projects: [...(currentValues.projects || []), ...(newData.projects || [])],
      ...newData,
    };
    if (newData.creationMode === "magic") {
      setTemplate("raw");
    }
    form.reset(merged as ResumeContent);
    setPreviewContent(merged as ResumeContent);
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;
  if (isError) return <div className="h-screen flex items-center justify-center">Resume not found</div>;
  if (!previewContent) return null;

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden pt-16">
      <Navbar />

      {/* Top Toolbar */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-4 shrink-0 shadow-sm z-40 print:hidden">
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
          {/* Magic Auto-Fill Option */}
          <MagicImport onImport={handleImport} />

          <div className="flex items-center gap-2 mr-4 ml-2">
            <span className="text-sm text-slate-500 font-medium">Template:</span>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="raw">Magic Text</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="icon" onClick={handleDownloadImage} title="Download as Image">
            <Download className="w-4 h-4" />
          </Button>

          <Button variant="outline" onClick={() => handleSave(false)} disabled={updateResume.isPending}>
            {updateResume.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save
          </Button>

          <Button onClick={() => handleSave(false, true)} className="bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Save & Exit
          </Button>

          <Button onClick={handlePrint} className="bg-slate-900 hover:bg-slate-800">
            <Printer className="w-4 h-4 mr-2" />
            PDF
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">

        {/* Editor Pane (Left) */}
        <div className="w-1/2 lg:w-[45%] max-w-2xl bg-slate-50 border-r flex flex-col print:hidden relative">
          {!previewContent.creationMode ? (
            <div className="absolute inset-0 z-20 bg-slate-50 flex items-center justify-center p-8 text-center">
              <div className="max-w-sm space-y-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-primary">
                  <Sparkles size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Choose Creation Mode</h2>
                  <p className="text-slate-500 mt-2">How would you like to build your resume today?</p>
                </div>
                <div className="grid gap-4">
                  <Button
                    onClick={() => handleImport({ creationMode: "manual" })}
                    className="h-20 flex-col gap-1 text-lg font-bold"
                  >
                    📝 Fill Manual Form
                    <span className="text-[10px] font-normal opacity-80 uppercase tracking-widest">Step-by-step fields</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleImport({ creationMode: "magic" })}
                    className="h-20 flex-col gap-1 border-primary/20 hover:bg-primary/5 text-lg font-bold"
                  >
                    ✨ Magic Paste
                    <span className="text-[10px] font-normal text-slate-400 uppercase tracking-widest">Paste existing text</span>
                  </Button>
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <ResumeForm form={form} mode={previewContent.creationMode} />
          </div>
        </div>

        {/* Preview Pane (Right) */}
        <div className="flex-1 bg-slate-200/50 overflow-y-auto p-8 flex justify-center items-start print:p-0 print:bg-white print:overflow-visible print:block">
          {/* 
            Scale wrapper for smaller screens 
            We use a fixed width container to simulate A4 size
          */}
          <div className="print:w-full print:h-full">
            <div ref={componentRef} id="resume-preview" className="print-area">
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
