import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  FileText, 
  Sparkles, 
  Layout, 
  ArrowRight, 
  Clock, 
  Shield, 
  CheckCircle2,
  Users,
  Zap,
  Award,
  ChevronLeft,
  ChevronRight,
  Star,
  Moon,
  Sun,
  Pencil
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Software Engineer",
    content: "This resume builder helped me land my dream job at a top tech company! The templates are modern and the interface is incredibly intuitive.",
    rating: 5,
    time: "2 hours ago"
  },
  {
    name: "James Wilson",
    role: "Marketing Manager",
    content: "I've tried many resume builders, but this one stands out. The live preview feature saved me so much time!",
    rating: 5,
    time: "5 hours ago"
  },
  {
    name: "Emily Chen",
    role: "Product Designer",
    content: "Beautiful templates that actually get past ATS systems. Received 3 interview calls within a week of using my new resume.",
    rating: 5,
    time: "1 day ago"
  },
  {
    name: "Michael Brown",
    role: "Data Analyst",
    content: "Simple, fast, and professional. Created my resume in under 10 minutes and it looks amazing!",
    rating: 5,
    time: "1 day ago"
  },
  {
    name: "Anna Rodriguez",
    role: "HR Specialist",
    content: "As someone who reviews resumes daily, I can say these templates are exactly what recruiters look for.",
    rating: 5,
    time: "2 days ago"
  }
];

const features = [
  {
    icon: Clock,
    title: "Time-saving solutions",
    description: "Create a professional resume in minutes. Let us handle the details while you focus on your job hunt.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    icon: Users,
    title: "HR-approved templates",
    description: "Templates designed with input from hiring professionals who know what works.",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
  },
  {
    icon: CheckCircle2,
    title: "ATS-friendly",
    description: "Beat the ATS — the system that screens resumes. Get noticed by employers!",
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
  },
  {
    icon: Layout,
    title: "Designs for every level",
    description: "Explore templates for your first job, a career change, or a leadership role.",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
  },
  {
    icon: Sparkles,
    title: "Smart suggestions",
    description: "Get guidance on keywords and content to make your resume stand out.",
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
  },
  {
    icon: Shield,
    title: "Security first",
    description: "Keep your personal data protected with industry-standard security measures.",
    color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400"
  }
];

const steps = [
  {
    number: "01",
    title: "Create or Upload",
    description: "Start fresh or upload your existing resume to enhance it."
  },
  {
    number: "02",
    title: "Enter Your Details",
    description: "Fill in your experience, skills, and education — we'll structure it perfectly."
  },
  {
    number: "03",
    title: "Choose Template",
    description: "Pick from our professional templates and customize colors and fonts."
  },
  {
    number: "04",
    title: "Download PDF",
    description: "Export your polished resume and start applying to jobs!"
  }
];

const faqs = [
  {
    question: "What is ResuMakers?",
    answer: "ResuMakers is a professional resume builder that helps you create ATS-friendly, job-winning resumes in minutes. Our templates are designed by HR experts and optimized to get past automated screening systems."
  },
  {
    question: "How do I create a resume?",
    answer: "Simply sign up, choose a template, fill in your details using our intuitive form, preview your resume in real-time, and download it as a PDF when you're ready."
  },
  {
    question: "Are the templates ATS-friendly?",
    answer: "Yes! All our templates are designed to be ATS (Applicant Tracking System) friendly. They use clean formatting that automated systems can easily parse, increasing your chances of getting through initial screenings."
  },
  {
    question: "Can I edit my resume after creating it?",
    answer: "Absolutely! You can edit your resume anytime from your dashboard. All your resumes are saved securely and you can make unlimited changes."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take security seriously. All data is encrypted and stored securely. We never share your personal information with third parties."
  }
];

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
      className="rounded-full"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

export default function Landing() {
  const { user, isLoading } = useAuth();
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-lg shadow-primary/25">
                <FileText size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight">ResuMakers</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">Features</a>
              <a href="#templates" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">Templates</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">Reviews</a>
              <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">FAQ</a>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              {isLoading ? (
                <div className="w-28 h-10 bg-muted rounded-lg animate-pulse" />
              ) : user ? (
                <Link href="/dashboard">
                  <Button data-testid="button-dashboard">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Button variant="outline" asChild data-testid="button-login" className="hidden sm:flex">
                    <a href="/api/login">Log in</a>
                  </Button>
                  <Button asChild data-testid="button-get-started-nav">
                    <a href="/api/login">
                      <Pencil className="w-4 h-4 mr-2" />
                      Build my resume
                    </a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Create a job-winning resume in minutes!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Create an ATS-friendly, professional resume with our AI-powered builder — trusted by top recruiters.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <Button variant="outline" size="lg" className="h-12 px-6 rounded-full" asChild data-testid="button-improve-resume">
                  <a href={user ? "/dashboard" : "/api/login"}>
                    Improve my resume
                  </a>
                </Button>
                <Button size="lg" className="h-12 px-6 rounded-full shadow-lg shadow-primary/30" asChild data-testid="button-create-resume">
                  <a href={user ? "/dashboard" : "/api/login"}>
                    Create new resume
                  </a>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 sm:gap-12">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold">
                    <AnimatedCounter end={1284} />
                  </div>
                  <p className="text-sm text-muted-foreground">resumes created<br />today</p>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">x2.2</div>
                  <p className="text-sm text-muted-foreground">more interview<br />invitations</p>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-500">+43%</div>
                  <p className="text-sm text-muted-foreground">higher chance of getting a<br />job<sup>1</sup></p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Resume Previews */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative h-[500px] lg:h-[600px]"
            >
              {/* Main Resume - Center */}
              <motion.div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-72 z-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-card rounded-lg shadow-2xl border border-border overflow-hidden">
                  <div className="p-4 bg-card">
                    {/* Resume Header */}
                    <div className="text-xs font-semibold mb-1">Lucy Liu, Accountant</div>
                    <div className="text-[8px] text-muted-foreground mb-3">New York, NY | lucy@email.com</div>
                    
                    {/* Summary */}
                    <div className="mb-3">
                      <div className="text-[7px] font-bold text-primary mb-1 uppercase tracking-wider">Summary</div>
                      <div className="space-y-0.5">
                        <div className="h-1 bg-muted rounded w-full" />
                        <div className="h-1 bg-muted rounded w-11/12" />
                        <div className="h-1 bg-muted rounded w-10/12" />
                      </div>
                    </div>
                    
                    {/* Experience */}
                    <div className="mb-3">
                      <div className="text-[7px] font-bold text-primary mb-1 uppercase tracking-wider">Work Experience</div>
                      <div className="space-y-2">
                        <div>
                          <div className="h-1.5 bg-foreground/20 rounded w-3/4 mb-1" />
                          <div className="space-y-0.5">
                            <div className="h-1 bg-muted rounded w-full" />
                            <div className="h-1 bg-muted rounded w-5/6" />
                          </div>
                        </div>
                        <div>
                          <div className="h-1.5 bg-foreground/20 rounded w-2/3 mb-1" />
                          <div className="space-y-0.5">
                            <div className="h-1 bg-muted rounded w-full" />
                            <div className="h-1 bg-muted rounded w-4/5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <div className="text-[7px] font-bold text-primary mb-1 uppercase tracking-wider">Education</div>
                      <div className="h-1.5 bg-foreground/20 rounded w-1/2 mb-1" />
                      <div className="h-1 bg-muted rounded w-3/4" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Top Right Resume */}
              <motion.div 
                className="absolute right-0 top-0 w-48 sm:w-56 z-10"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.02, rotate: -1 }}
              >
                <div className="bg-card rounded-lg shadow-xl border border-border overflow-hidden">
                  {/* Header with photo */}
                  <div className="p-3 bg-card">
                    <div className="flex gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center text-amber-800 font-bold text-xs">AW</div>
                      <div className="flex-1">
                        <div className="text-[9px] font-semibold">AIDEN WILLIAMS</div>
                        <div className="text-[7px] text-muted-foreground">Senior Developer</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-[6px] font-bold text-primary mb-1">WORK EXPERIENCE</div>
                        <div className="space-y-0.5">
                          <div className="h-0.5 bg-muted rounded w-full" />
                          <div className="h-0.5 bg-muted rounded w-4/5" />
                          <div className="h-0.5 bg-muted rounded w-5/6" />
                        </div>
                      </div>
                      <div>
                        <div className="text-[6px] font-bold text-primary mb-1">SKILLS</div>
                        <div className="flex flex-wrap gap-0.5">
                          <div className="h-2 w-6 bg-primary/20 rounded-sm" />
                          <div className="h-2 w-8 bg-primary/20 rounded-sm" />
                          <div className="h-2 w-5 bg-primary/20 rounded-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Left Resume */}
              <motion.div 
                className="absolute left-0 bottom-8 w-44 sm:w-52 z-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.02, rotate: 1 }}
              >
                <div className="bg-card rounded-lg shadow-xl border border-border overflow-hidden">
                  <div className="bg-slate-700 dark:bg-slate-800 p-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-500" />
                      <div>
                        <div className="text-[8px] font-semibold text-white">MIKE CHEN</div>
                        <div className="text-[6px] text-slate-300">Product Manager</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-card">
                    <div className="space-y-1">
                      <div className="h-1 bg-muted rounded w-full" />
                      <div className="h-1 bg-muted rounded w-5/6" />
                      <div className="h-1 bg-muted rounded w-4/5" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div 
                className="absolute left-4 top-20 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </motion.div>

              <motion.div 
                className="absolute right-12 bottom-24 w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Star className="w-5 h-5 text-green-600 dark:text-green-400" />
              </motion.div>

              <motion.div 
                className="absolute left-20 bottom-4 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-8 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center text-muted-foreground mb-6">Our resumes got candidates hired by top companies<sup>2</sup></p>
          <div className="flex justify-center items-center gap-8 sm:gap-16 flex-wrap opacity-40">
            <div className="text-xl sm:text-2xl font-bold">Google</div>
            <div className="text-xl sm:text-2xl font-bold">Microsoft</div>
            <div className="text-xl sm:text-2xl font-bold">Amazon</div>
            <div className="text-xl sm:text-2xl font-bold">Apple</div>
            <div className="text-xl sm:text-2xl font-bold">Meta</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Users Say</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-muted-foreground font-medium">Excellent</span>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <motion.div 
                key={testimonialIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 sm:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[testimonialIndex].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonials[testimonialIndex].name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonials[testimonialIndex].role}</p>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed">"{testimonials[testimonialIndex].content}"</p>
                  <p className="text-sm text-muted-foreground mt-4">{testimonials[testimonialIndex].time}</p>
                </Card>
              </motion.div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button variant="outline" size="icon" onClick={prevTestimonial} data-testid="button-prev-testimonial">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === testimonialIndex ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                    data-testid={`button-testimonial-dot-${i}`}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={nextTestimonial} data-testid="button-next-testimonial">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Resume Templates That Get You{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Noticed & Hired</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our collection of professionally designed templates, optimized for ATS systems.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-card rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl">
                  <div className={`h-full p-3 ${
                    i === 0 ? 'bg-gradient-to-b from-blue-50 to-card dark:from-blue-950/30' :
                    i === 1 ? 'bg-gradient-to-b from-purple-50 to-card dark:from-purple-950/30' :
                    i === 2 ? 'bg-gradient-to-b from-green-50 to-card dark:from-green-950/30' :
                    i === 3 ? 'bg-gradient-to-b from-orange-50 to-card dark:from-orange-950/30' :
                    'bg-gradient-to-b from-pink-50 to-card dark:from-pink-950/30'
                  }`}>
                    <div className={`w-8 h-8 rounded-full mb-2 ${
                      i === 0 ? 'bg-blue-200 dark:bg-blue-800' :
                      i === 1 ? 'bg-purple-200 dark:bg-purple-800' :
                      i === 2 ? 'bg-green-200 dark:bg-green-800' :
                      i === 3 ? 'bg-orange-200 dark:bg-orange-800' :
                      'bg-pink-200 dark:bg-pink-800'
                    }`} />
                    <div className="h-2 bg-muted rounded w-3/4 mb-1" />
                    <div className="h-1.5 bg-muted/50 rounded w-1/2 mb-3" />
                    <div className="space-y-1.5">
                      <div className="h-1.5 bg-muted/50 rounded w-full" />
                      <div className="h-1.5 bg-muted/50 rounded w-5/6" />
                      <div className="h-1.5 bg-muted/50 rounded w-4/5" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="secondary">Choose Template</Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button size="lg" variant="outline" asChild data-testid="button-view-templates">
              <a href={user ? "/dashboard" : "/api/login"}>
                View All Templates <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Our Resume Builder</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create a professional, job-winning resume.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild data-testid="button-create-resume-features">
              <a href={user ? "/dashboard" : "/api/login"}>
                Create My Resume <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">4 Easy Steps to Create a Resume</h2>
            <p className="text-muted-foreground">Get your professional resume ready in minutes.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/25">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild data-testid="button-create-resume-steps">
              <a href={user ? "/dashboard" : "/api/login"}>
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-xl border px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5" data-testid={`button-faq-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of job seekers who landed their dream jobs with our professional resume templates.
          </p>
          <Button size="lg" variant="secondary" className="h-14 px-10 text-lg" asChild data-testid="button-create-resume-cta">
            <a href={user ? "/dashboard" : "/api/login"}>
              Create My Resume <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                <FileText size={18} />
              </div>
              <span className="font-bold text-lg text-white">ResuMakers</span>
            </div>
            <p className="text-slate-400 text-sm">© 2025 ResuMakers. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
