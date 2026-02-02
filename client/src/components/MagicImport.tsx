import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, ClipboardType } from "lucide-react";
import { type ResumeContent } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface MagicImportProps {
    onImport: (data: Partial<ResumeContent>) => void;
}

export function MagicImport({ onImport }: MagicImportProps) {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [isParsing, setIsParsing] = useState(false);
    const { toast } = useToast();

    const handleMagicImport = () => {
        if (!text.trim()) {
            toast({ title: "Please paste some text", variant: "destructive" });
            return;
        }

        setIsParsing(true);

        // Simulate "AI" parsing with heuristics
        setTimeout(() => {
            try {
                const lines = text.split("\n").map(l => l.trim()).filter(l => l !== "");
                const content: Partial<ResumeContent> = {
                    personalInfo: {
                        fullName: lines[0] || "",
                        email: text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] || "",
                        phone: text.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/)?.[0] || "",
                        address: "",
                        summary: "",
                        profileImage: "",
                        customText: text
                    },
                    experience: [],
                    education: [],
                    skills: [],
                    projects: []
                };

                // Simple keyword-based section detection
                let currentSection: "experience" | "education" | "skills" | "projects" | "summary" | null = null;

                lines.forEach(line => {
                    const lower = line.toLowerCase();
                    if (lower.includes("experience") || lower.includes("work history") || lower.includes("employment")) {
                        currentSection = "experience";
                        return;
                    }
                    if (lower.includes("education") || lower.includes("academic")) {
                        currentSection = "education";
                        return;
                    }
                    if (lower.includes("skills") || lower.includes("expertise") || lower.includes("technologies")) {
                        currentSection = "skills";
                        return;
                    }
                    if (lower.includes("projects")) {
                        currentSection = "projects";
                        return;
                    }
                    if (lower.includes("summary") || lower.includes("objective") || lower.includes("about me")) {
                        currentSection = "summary";
                        return;
                    }

                    if (currentSection === "summary") {
                        content.personalInfo!.summary = (content.personalInfo!.summary || "") + (line.startsWith("-") || line.startsWith("•") ? "\n" : " ") + line;
                    } else if (currentSection === "skills") {
                        // Split by comma, pipe, bullet, or multiple spaces
                        const skills = line.split(/[,|•\t]|\s{2,}/).map(s => s.trim()).filter(s => s && s.length < 50);
                        content.skills = Array.from(new Set([...(content.skills || []), ...skills]));
                    } else if (currentSection === "experience" && line.length > 5) {
                        const parts = line.split(/\s+at\s+|[-|:]/).map(p => p.trim());
                        if (parts.length >= 2) {
                            content.experience?.push({
                                id: crypto.randomUUID(),
                                position: parts[0],
                                company: parts[1],
                                startDate: "2020",
                                endDate: "Present",
                                description: parts.slice(2).join(" ") || ""
                            });
                        } else {
                            content.experience?.push({
                                id: crypto.randomUUID(),
                                position: line,
                                company: "",
                                startDate: "",
                                endDate: "",
                                description: ""
                            });
                        }
                    } else if (currentSection === "education" && line.length > 5) {
                        const parts = line.split(/[-|:]/).map(p => p.trim());
                        content.education?.push({
                            id: crypto.randomUUID(),
                            school: parts[0] || line,
                            degree: parts[1] || "",
                            startDate: "",
                            endDate: "",
                            description: ""
                        });
                    }
                });

                onImport(content);
                toast({ title: "Magic Import Successful!", description: "We've filled what we could find." });
                setOpen(false);
                setText("");
            } catch (err) {
                toast({ title: "Failed to parse text", variant: "destructive" });
            } finally {
                setIsParsing(false);
            }
        }, 1500);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/5 hover:text-primary font-bold">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Magic Import
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Magic Auto-Fill
                    </DialogTitle>
                    <DialogDescription>
                        Paste your existing resume text below. Our AI-lite parser will try to fill the fields for you automatically.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Textarea
                        placeholder="Paste your resume text here (e.g. from LinkedIn, PDF, or Word)..."
                        className="min-h-[300px] font-mono text-sm leading-relaxed"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleMagicImport} disabled={isParsing}>
                        {isParsing ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Parsing Text...
                            </>
                        ) : (
                            <>
                                <ClipboardType className="w-4 h-4 mr-2" />
                                Done! Fill Resume
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
