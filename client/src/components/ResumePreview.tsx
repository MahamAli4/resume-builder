import { type ResumeContent } from "@shared/schema";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeContent;
  templateId: string;
  className?: string;
  id?: string;
}

export function ResumePreview({ data, templateId, className, id }: ResumePreviewProps) {
  const { personalInfo, education, experience, skills, projects } = data;

  if (templateId === "classic") {
    return (
      <div id={id} className={cn("resume-page p-12 text-sm text-gray-800 font-serif leading-relaxed", className)}>
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-6 mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 uppercase tracking-widest text-gray-900">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm mt-3">
            {personalInfo.email && <span className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</span>}
            {personalInfo.address && <span className="flex items-center gap-1"><MapPin size={12} /> {personalInfo.address}</span>}
          </div>
          {personalInfo.summary && (
            <p className="mt-4 max-w-2xl mx-auto italic text-gray-700">
              {personalInfo.summary}
            </p>
          )}
        </div>

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Professional Experience</h2>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{exp.position}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">{exp.company}</div>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Education</h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{edu.school}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="text-sm text-gray-700">{edu.degree}</div>
                  {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Skills</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {skills.map((skill, i) => (
                <span key={i} className="text-sm text-gray-700">• {skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Modern Template (Default)
  return (
    <div id={id} className={cn("resume-page grid grid-cols-[30%_70%] text-sm font-sans", className)}>
      {/* Sidebar (Left) */}
      <div className="bg-slate-900 text-white p-8 h-full flex flex-col gap-8 print:bg-slate-900 print:text-white">
        {/* Photo */}
        <div className="text-center">
          {personalInfo.profileImage ? (
             <img 
               src={personalInfo.profileImage} 
               alt={personalInfo.fullName} 
               className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white/20"
             />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-white/10 flex items-center justify-center text-4xl font-bold">
              {personalInfo.fullName.charAt(0)}
            </div>
          )}
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 border-b border-slate-700 pb-2">Contact</h3>
          <ul className="space-y-3 text-sm">
            {personalInfo.email && (
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-primary shrink-0" />
                <span className="break-all">{personalInfo.email}</span>
              </li>
            )}
            {personalInfo.phone && (
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-primary shrink-0" />
                <span>{personalInfo.phone}</span>
              </li>
            )}
            {personalInfo.address && (
              <li className="flex items-center gap-3">
                <MapPin size={14} className="text-primary shrink-0" />
                <span>{personalInfo.address}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 border-b border-slate-700 pb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="bg-white/10 px-2 py-1 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Projects (if any) */}
        {projects.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 border-b border-slate-700 pb-2">Projects</h3>
            <div className="space-y-4">
              {projects.map((proj, i) => (
                <div key={i}>
                  <div className="font-bold">{proj.name}</div>
                  <p className="text-xs text-slate-400 mt-1 mb-1">{proj.description}</p>
                  {proj.link && <a href={proj.link} className="text-xs text-primary underline truncate block" target="_blank" rel="noreferrer">Link</a>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content (Right) */}
      <div className="bg-white p-10 h-full flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight font-display mb-2">
            {personalInfo.fullName || "Your Name"}
          </h1>
          {experience[0] && (
            <p className="text-xl text-primary font-medium tracking-wide">
              {experience[0].position}
            </p>
          )}
          {personalInfo.summary && (
            <p className="mt-6 text-slate-600 leading-relaxed">
              {personalInfo.summary}
            </p>
          )}
        </div>

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-100 pb-2 mb-6">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-slate-200">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-slate-200" />
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-slate-800">{exp.position}</h3>
                    <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full whitespace-nowrap">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <div className="text-primary font-medium mb-3">{exp.company}</div>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 border-b-2 border-slate-100 pb-2 mb-6">Education</h2>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-bold text-slate-800">{edu.school}</h3>
                    <span className="text-sm text-slate-500">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="text-slate-600">{edu.degree}</div>
                  {edu.description && <p className="text-sm text-slate-500 mt-2">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
