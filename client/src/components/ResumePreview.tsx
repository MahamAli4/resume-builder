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
            {personalInfo.socialLinks?.map((link, i) => (
              <span key={i} className="flex items-center gap-1"><Globe size={12} /> {link.platform}: {link.url}</span>
            ))}
          </div>
          {personalInfo.jobTitle && <div className="text-gray-700 font-bold mt-2 uppercase tracking-widest">{personalInfo.jobTitle}</div>}
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
                  <div
                    className="rich-text text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: exp.description || "" }}
                  />
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

  if (templateId === "raw") {
    return (
      <div id={id} className={cn("resume-page p-12 bg-white min-h-[1123px] shadow-lg flex flex-col", className)}>
        {/* Header */}
        <div className="flex justify-between items-start border-b-4 border-slate-900 pb-8 mb-10">
          <div>
            <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-4">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold text-slate-500 tracking-widest mt-1">
              <span className="normal-case flex items-center gap-1"><Mail size={10} /> {personalInfo.email}</span>
              {personalInfo.phone && (
                <span className="flex items-center gap-1"><Phone size={10} /> {personalInfo.phone}</span>
              )}
              {personalInfo.socialLinks?.map((link, i) => (
                <span key={i} className="flex items-center gap-1 normal-case">
                  <Globe size={10} /> {link.platform && `${link.platform}: `}{link.url}
                </span>
              ))}
            </div>
            {personalInfo.jobTitle && (
              <div className="text-primary font-black tracking-[0.3em] mt-3 text-[10px]">
                {personalInfo.jobTitle}
              </div>
            )}
          </div>
          <div className="w-24 h-24 bg-slate-900 text-white flex items-center justify-center text-4xl font-bold rounded-lg shadow-xl shrink-0">
            {personalInfo.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : "R"}
          </div>
        </div>

        {/* Content Section */}
        <div
          className="rich-text flex-1 text-slate-900 leading-relaxed font-sans text-[14px]"
          dangerouslySetInnerHTML={{ __html: personalInfo.customText || "No content pasted yet. Click 'Magic Import' to paste your resume text." }}
        />

        {/* Footer decoration */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-[10px] text-slate-300 uppercase tracking-[0.3em] text-center">
          Generated via Resume Builder Magic Text
        </div>
      </div>
    );
  }

  // Modern Template (Default)
  return (
    <div id={id} className={cn("resume-page grid grid-cols-[32%_68%] text-sm font-sans min-h-[1123px] bg-white shadow-lg", className)}>
      {/* Sidebar (Left) */}
      <div className="bg-[#0f172a] text-white p-7 flex flex-col gap-8 print:bg-[#0f172a] print:text-white overflow-hidden">
        {/* Photo */}
        <div className="relative mt-2">
          {personalInfo.profileImage ? (
            <div className="w-32 h-32 mx-auto relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.fullName}
                className="w-32 h-32 rounded-full mx-auto relative z-10 object-cover border-4 border-white/10 shadow-xl"
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center text-5xl font-bold text-slate-400">
              {personalInfo.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : "?"}
            </div>
          )}
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-primary font-black mb-4 border-b border-white/10 pb-2">Contact Info</h3>
          <ul className="space-y-4">
            {personalInfo.email && (
              <li className="group">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail size={14} className="text-primary" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Email</span>
                </div>
                <span className="text-xs break-words block pl-10 text-slate-300 leading-relaxed">{personalInfo.email}</span>
              </li>
            )}
            {personalInfo.phone && (
              <li className="group">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone size={14} className="text-primary" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Phone</span>
                </div>
                <span className="text-xs break-words block pl-10 text-slate-300">{personalInfo.phone}</span>
              </li>
            )}
            {personalInfo.address && (
              <li className="group">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MapPin size={14} className="text-primary" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Location</span>
                </div>
                <span className="text-xs break-words block pl-10 text-slate-300 leading-snug">{personalInfo.address}</span>
              </li>
            )}
            {personalInfo.socialLinks?.map((link, i) => (
              <li key={i} className="group">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Globe size={14} className="text-primary" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{link.platform || "Link"}</span>
                </div>
                <span className="text-xs break-all block pl-10 text-slate-300 leading-tight">{link.url}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-primary font-black mb-4 border-b border-white/10 pb-2">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="bg-white/5 hover:bg-white/10 border border-white/5 px-2.5 py-1 rounded-md text-[11px] text-slate-300 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects (if any) */}
        {projects.length > 0 && (
          <div className="mt-auto">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-primary font-black mb-4 border-b border-white/10 pb-2">Portfolio</h3>
            <div className="space-y-5">
              {projects.map((proj, i) => (
                <div key={i} className="group">
                  <div className="font-bold text-sm text-white group-hover:text-primary transition-colors">{proj.name}</div>
                  <div
                    className="rich-text text-[11px] text-slate-500 mt-1.5 leading-relaxed italic"
                    dangerouslySetInnerHTML={{ __html: proj.description || "" }}
                  />
                  {proj.link && (
                    <a href={proj.link} className="inline-flex items-center gap-1 text-[10px] text-primary mt-2 group-hover:underline" target="_blank" rel="noreferrer">
                      <Globe size={10} /> View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content (Right) */}
      <div className="bg-white p-12 h-full flex flex-col gap-10">
        {/* Header */}
        <div className="relative">
          <div className="absolute -left-12 top-0 w-1 h-20 bg-primary" />
          <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-3">
            {personalInfo.fullName ? (
              <>
                {personalInfo.fullName.split(' ')[0]} <span className="text-primary">{personalInfo.fullName.split(' ').slice(1).join(' ')}</span>
              </>
            ) : "Professional Name"}
          </h1>
          {personalInfo.jobTitle ? (
            <p className="text-sm tracking-[0.4em] text-slate-400 font-bold">
              {personalInfo.jobTitle}
            </p>
          ) : experience[0] && (
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400 font-bold">
              {experience[0].position}
            </p>
          )}
          {personalInfo.summary && (
            <div className="mt-8 relative">
              <p className="text-slate-600 leading-relaxed text-[13.5px] relative z-10">
                {personalInfo.summary}
              </p>
              <div className="absolute -left-2 -top-2 text-6xl text-slate-50 opacity-10 font-serif">"</div>
            </div>
          )}
        </div>

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-lg font-black uppercase tracking-widest text-slate-900 shrink-0">Experience</h2>
              <div className="h-px bg-slate-100 w-full" />
            </div>
            <div className="space-y-10">
              {experience.map((exp, i) => (
                <div key={i} className="grid grid-cols-[140px_1fr] gap-6">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-tighter pt-1">
                    {exp.startDate || exp.endDate ? `${exp.startDate}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate}` : ""}
                  </div>
                  <div className="relative">
                    <h3 className="text-lg font-bold text-slate-900 leading-none mb-1 group-hover:text-primary transition-colors">
                      {exp.position}
                    </h3>
                    {exp.company && <div className="text-primary font-bold text-sm mb-3 tracking-wide">{exp.company}</div>}
                    <div
                      className="rich-text text-slate-600 leading-relaxed text-[13px]"
                      dangerouslySetInnerHTML={{ __html: exp.description || "" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mt-auto">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-lg font-black uppercase tracking-widest text-slate-900 shrink-0">Education</h2>
              <div className="h-px bg-slate-100 w-full" />
            </div>
            <div className="space-y-8">
              {education.map((edu, i) => (
                <div key={i} className="grid grid-cols-[140px_1fr] gap-6">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-tighter pt-1">
                    {edu.startDate || edu.endDate ? `${edu.startDate}${edu.startDate && edu.endDate ? ' – ' : ''}${edu.endDate}` : ""}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{edu.school}</h3>
                    <div className="text-primary font-medium text-sm">{edu.degree}</div>
                    {edu.description && <p className="text-xs text-slate-500 mt-2 leading-relaxed">{edu.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`
        .rich-text ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .rich-text ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .rich-text p {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
