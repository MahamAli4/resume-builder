import { UseFormReturn, useFieldArray, Controller } from "react-hook-form";
import { type ResumeContent } from "@shared/schema";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, GripVertical, Upload, Loader2, Image as ImageIcon, Sparkles, ArrowUp, ArrowDown } from "lucide-react";
import { useState, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { RichTextEditor } from "./RichTextEditor";

interface ResumeFormProps {
  form: UseFormReturn<ResumeContent>;
  mode?: "manual" | "magic";
}

export function ResumeForm({ form, mode }: ResumeFormProps) {
  const { register, control, setValue, watch } = form;
  const { user } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profileImageUrl = watch("personalInfo.profileImage");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file type", description: "Please upload an image file.", variant: "destructive" });
      return;
    }

    try {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (base64String.length > 800000) {
          toast({
            title: "Image too large",
            description: "Please use a smaller, lower resolution image.",
            variant: "destructive",
          });
          setIsUploading(false);
          return;
        }
        setValue("personalInfo.profileImage", base64String);
        toast({ title: "Image Attached", description: "Your picture is ready." });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      toast({ title: "Processing failed", description: error.message, variant: "destructive" });
      setIsUploading(false);
    }
  };

  const { fields: eduFields, append: appendEdu, remove: removeEdu, move: moveEdu } = useFieldArray({
    control,
    name: "education",
  });

  const { fields: expFields, append: appendExp, remove: removeExp, move: moveExp } = useFieldArray({
    control,
    name: "experience",
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: "skills" as any,
  });

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
    control,
    name: "personalInfo.socialLinks" as any,
  });

  const { fields: projFields, append: appendProj, remove: removeProj, move: moveProj } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <div className="h-full overflow-y-auto pr-4 pb-20">
      <Accordion type="multiple" defaultValue={["personal"]} className="w-full space-y-4 pb-20">

        {/* Magic Text Content (Raw Paste) */}
        {mode === "magic" && (
          <AccordionItem value="magic-text" className="border-primary/20 bg-primary/5 rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 text-primary font-bold hover:no-underline">
              <div className="flex items-center gap-2">
                <Sparkles size={18} />
                Magic Text Content (Paste Mode)
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 space-y-4">
              {/* Content Section */}
              <Controller
                name="personalInfo.customText"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Paste or write your resume content here..."
                    className="min-h-[400px]"
                  />
                )}
              />
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Personal Info */}
        <AccordionItem value="personal" className="border rounded-lg bg-white shadow-sm px-4">
          <AccordionTrigger className="text-lg font-semibold text-slate-800 hover:no-underline">
            Personal Information
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" {...register("personalInfo.fullName")} placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Professional Title</Label>
                <Input id="jobTitle" {...register("personalInfo.jobTitle")} placeholder="e.g. Web Developer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register("personalInfo.email")} placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register("personalInfo.phone")} placeholder="+1 234 567 890" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" {...register("personalInfo.address")} placeholder="City, Country" />
              </div>

              {/* Social Links Sub-section */}
              <div className="col-span-full border-t pt-4 mt-2">
                <Label className="text-sm font-bold block mb-3">Links & Social Profiles</Label>
                <div className="space-y-3">
                  {socialFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-start">
                      <div className="flex-1 grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-lg border">
                        <Input
                          {...register(`personalInfo.socialLinks.${index}.platform` as any)}
                          placeholder="Platform (e.g. LinkedIn)"
                          className="h-9 text-xs"
                        />
                        <Input
                          {...register(`personalInfo.socialLinks.${index}.url` as any)}
                          placeholder="Link / URL"
                          className="h-9 text-xs"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-slate-400 hover:text-red-500"
                        onClick={() => removeSocial(index)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => appendSocial({ platform: "", url: "" })}
                  >
                    <Plus size={14} className="mr-2" /> Add Social Link
                  </Button>
                </div>
              </div>

              <div className="col-span-full space-y-2 mt-4">
                <Label>Profile Picture</Label>
                <div className="flex items-center gap-4">
                  {profileImageUrl && (
                    <img src={profileImageUrl} className="w-16 h-16 rounded-full object-cover border" />
                  )}
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                    {isUploading ? <Loader2 className="animate-spin mr-2" /> : <Upload className="mr-2" />}
                    Upload Photo
                  </Button>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Manual Mode Sections */}
        {mode === "manual" && (
          <>
            {/* Experience */}
            <AccordionItem value="experience" className="border rounded-lg bg-white shadow-sm px-4">
              <AccordionTrigger className="text-lg font-semibold text-slate-800 hover:no-underline">
                Experience
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6 space-y-6">
                {expFields.map((field, index) => (
                  <Card key={field.id} className="relative group">
                    <div className="absolute -top-3 left-4 flex gap-2">
                      <Button variant="outline" size="icon" className="h-6 w-6 rounded-full bg-white shadow-sm" onClick={() => moveExp(index, index - 1)} disabled={index === 0}>
                        <ArrowUp size={12} />
                      </Button>
                      <Button variant="outline" size="icon" className="h-6 w-6 rounded-full bg-white shadow-sm" onClick={() => moveExp(index, index + 1)} disabled={index === expFields.length - 1}>
                        <ArrowDown size={12} />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeExp(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input {...register(`experience.${index}.company`)} placeholder="Company" />
                        </div>
                        <div className="space-y-2">
                          <Label>Position</Label>
                          <Input {...register(`experience.${index}.position`)} placeholder="Position" />
                        </div>
                        <div className="space-y-2">
                          <Label>Start</Label>
                          <Input {...register(`experience.${index}.startDate`)} placeholder="Jan 2020" />
                        </div>
                        <div className="space-y-2">
                          <Label>End</Label>
                          <Input {...register(`experience.${index}.endDate`)} placeholder="Present" />
                        </div>
                        <div className="col-span-full space-y-2">
                          <Label>Description</Label>
                          <Controller
                            name={`experience.${index}.description`}
                            control={control}
                            render={({ field }) => (
                              <RichTextEditor
                                value={field.value || ""}
                                onChange={field.onChange}
                                placeholder="Responsibilities and achievements..."
                              />
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full border-dashed py-6" onClick={() => appendExp({ id: crypto.randomUUID(), company: "", position: "", startDate: "", endDate: "", description: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Experience
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Education */}
            <AccordionItem value="education" className="border rounded-lg bg-white shadow-sm px-4">
              <AccordionTrigger className="text-lg font-semibold text-slate-800 hover:no-underline">
                Education
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6 space-y-6">
                {eduFields.map((field, index) => (
                  <Card key={field.id} className="relative group">
                    <div className="absolute -top-3 left-4 flex gap-2">
                      <Button variant="outline" size="icon" className="h-6 w-6 rounded-full bg-white shadow-sm" onClick={() => moveEdu(index, index - 1)} disabled={index === 0}>
                        <ArrowUp size={12} />
                      </Button>
                      <Button variant="outline" size="icon" className="h-6 w-6 rounded-full bg-white shadow-sm" onClick={() => moveEdu(index, index + 1)} disabled={index === eduFields.length - 1}>
                        <ArrowDown size={12} />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeEdu(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>School</Label>
                          <Input {...register(`education.${index}.school`)} placeholder="University" />
                        </div>
                        <div className="space-y-2">
                          <Label>Degree</Label>
                          <Input {...register(`education.${index}.degree`)} placeholder="Bachelor's" />
                        </div>
                        <div className="space-y-2">
                          <Label>Start</Label>
                          <Input {...register(`education.${index}.startDate`)} placeholder="2016" />
                        </div>
                        <div className="space-y-2">
                          <Label>End</Label>
                          <Input {...register(`education.${index}.endDate`)} placeholder="2020" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full border-dashed py-6" onClick={() => appendEdu({ id: crypto.randomUUID(), school: "", degree: "", startDate: "", endDate: "", description: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Education
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Skills */}
            <AccordionItem value="skills" className="border rounded-lg bg-white shadow-sm px-4">
              <AccordionTrigger className="text-lg font-semibold text-slate-800 hover:no-underline">
                Skills
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {skillFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2 bg-slate-100 p-1 pl-3 rounded-full">
                      <Input {...register(`skills.${index}`)} className="h-7 border-none bg-transparent w-32 p-0 text-sm" placeholder="Skill" />
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => removeSkill(index)}>
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={() => appendSkill("")}>
                  <Plus className="mr-2 h-4 w-4" /> Add Skill
                </Button>
              </AccordionContent>
            </AccordionItem>
            {/* Projects */}
            <AccordionItem value="projects" className="border rounded-lg bg-white shadow-sm px-4">
              <AccordionTrigger className="text-lg font-semibold text-slate-800 hover:no-underline">
                Projects
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6 space-y-6">
                {projFields.map((field, index) => (
                  <Card key={field.id} className="relative group">
                    <div className="absolute -top-3 left-4 flex gap-2">
                      <Button variant="outline" size="icon" className="h-6 w-6 rounded-full bg-white shadow-sm" onClick={() => moveProj(index, index - 1)} disabled={index === 0}>
                        <ArrowUp size={12} />
                      </Button>
                      <Button variant="outline" size="icon" className="h-6 w-6 rounded-full bg-white shadow-sm" onClick={() => moveProj(index, index + 1)} disabled={index === projFields.length - 1}>
                        <ArrowDown size={12} />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeProj(index)}
                    >
                      <Trash2 size={16} />
                    </Button>
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input {...register(`projects.${index}.name`)} placeholder="Project Name" />
                        </div>
                        <div className="space-y-2">
                          <Label>Link</Label>
                          <Input {...register(`projects.${index}.link`)} placeholder="https://..." />
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Controller
                            name={`projects.${index}.description`}
                            control={control}
                            render={({ field }) => (
                              <RichTextEditor
                                value={field.value || ""}
                                onChange={field.onChange}
                                placeholder="Brief description of the project..."
                              />
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full border-dashed py-6" onClick={() => appendProj({ id: crypto.randomUUID(), name: "", description: "", link: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Project
                </Button>
              </AccordionContent>
            </AccordionItem>
          </>
        )}
      </Accordion>
    </div>
  );
}
