import { UseFormReturn, useFieldArray } from "react-hook-form";
import { type ResumeContent } from "@shared/schema";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, GripVertical } from "lucide-react";

interface ResumeFormProps {
  form: UseFormReturn<ResumeContent>;
}

export function ResumeForm({ form }: ResumeFormProps) {
  const { register, control } = form;

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
    control,
    name: "education",
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control,
    name: "experience",
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: "skills" as any, // casting due to array of strings quirk in RHF
  });

  const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <div className="h-full overflow-y-auto pr-4 pb-20">
      <Accordion type="multiple" defaultValue={["personal", "experience"]} className="space-y-4">
        
        {/* Personal Info */}
        <AccordionItem value="personal" className="border rounded-lg bg-white shadow-sm px-4">
          <AccordionTrigger className="text-lg font-semibold text-slate-800 hover:no-underline">
            Personal Information
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" {...register("personalInfo.fullName")} placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register("personalInfo.email")} placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register("personalInfo.phone")} placeholder="+1 234 567 890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" {...register("personalInfo.address")} placeholder="City, Country" />
              </div>
              <div className="col-span-full space-y-2">
                <Label htmlFor="profileImage">Profile Image URL (Optional)</Label>
                <Input id="profileImage" {...register("personalInfo.profileImage")} placeholder="https://..." />
              </div>
              <div className="col-span-full space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea 
                  id="summary" 
                  {...register("personalInfo.summary")} 
                  placeholder="Experienced professional with..." 
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Experience */}
        <AccordionItem value="experience" className="border rounded-lg bg-white shadow-sm px-4">
          <AccordionTrigger className="text-lg font-semibold text-slate-800 hover:no-underline">
            Experience
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6 space-y-6">
            {expFields.map((field, index) => (
              <Card key={field.id} className="relative group">
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
                      <Input {...register(`experience.${index}.company`)} placeholder="Company Name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input {...register(`experience.${index}.position`)} placeholder="Job Title" />
                    </div>
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input {...register(`experience.${index}.startDate`)} placeholder="MM/YYYY" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input {...register(`experience.${index}.endDate`)} placeholder="MM/YYYY or Present" />
                    </div>
                    <div className="col-span-full space-y-2">
                      <Label>Description</Label>
                      <Textarea 
                        {...register(`experience.${index}.description`)} 
                        placeholder="• Achieved X..." 
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              className="w-full border-dashed border-2 py-6 text-slate-500 hover:text-primary hover:border-primary/50"
              onClick={() => appendExp({ id: crypto.randomUUID(), company: "", position: "", startDate: "", endDate: "", description: "" })}
            >
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
                      <Input {...register(`education.${index}.school`)} placeholder="University Name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input {...register(`education.${index}.degree`)} placeholder="Bachelor of Science" />
                    </div>
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input {...register(`education.${index}.startDate`)} placeholder="YYYY" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input {...register(`education.${index}.endDate`)} placeholder="YYYY" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              className="w-full border-dashed border-2 py-6 text-slate-500 hover:text-primary hover:border-primary/50"
              onClick={() => appendEdu({ id: crypto.randomUUID(), school: "", degree: "", startDate: "", endDate: "", description: "" })}
            >
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
                <div key={field.id} className="flex items-center gap-2 bg-slate-100 p-1 pl-3 rounded-full group hover:bg-slate-200 transition-colors">
                  <Input 
                    {...register(`skills.${index}`)} 
                    className="h-7 border-none bg-transparent w-32 focus-visible:ring-0 p-0 text-sm" 
                    placeholder="Skill" 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full hover:bg-white text-slate-400 hover:text-red-500"
                    onClick={() => removeSkill(index)}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              ))}
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => appendSkill("")}
            >
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
                      <Label>Project Name</Label>
                      <Input {...register(`projects.${index}.name`)} placeholder="Portfolio Website" />
                    </div>
                    <div className="space-y-2">
                      <Label>Link</Label>
                      <Input {...register(`projects.${index}.link`)} placeholder="https://..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea 
                        {...register(`projects.${index}.description`)} 
                        placeholder="Brief description of the project..." 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              className="w-full border-dashed border-2 py-6 text-slate-500 hover:text-primary hover:border-primary/50"
              onClick={() => appendProj({ id: crypto.randomUUID(), name: "", description: "", link: "" })}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
