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
  Star
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
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Users,
    title: "HR-approved templates",
    description: "Templates designed with input from hiring professionals who know what works.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: CheckCircle2,
    title: "ATS-friendly",
    description: "Beat the ATS — the system that screens resumes. Get noticed by employers!",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Layout,
    title: "Designs for every level",
    description: "Explore templates for your first job, a career change, or a leadership role.",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: Sparkles,
    title: "Smart suggestions",
    description: "Get guidance on keywords and content to make your resume stand out.",
    color: "bg-pink-100 text-pink-600"
  },
  {
    icon: Shield,
    title: "Security first",
    description: "Keep your personal data protected with industry-standard security measures.",
    color: "bg-cyan-100 text-cyan-600"
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
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-lg shadow-primary/25">
                <FileText size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">ResuMakers</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Features</a>
              <a href="#templates" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Templates</a>
              <a href="#testimonials" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">Reviews</a>
              <a href="#faq" className="text-slate-600 hover:text-primary transition-colors text-sm font-medium">FAQ</a>
            </div>
            <div>
              {isLoading ? (
                <div className="w-28 h-10 bg-slate-100 rounded-lg animate-pulse" />
              ) : user ? (
                <Link href="/dashboard">
                  <Button data-testid="button-dashboard">Go to Dashboard</Button>
                </Link>
              ) : (
                <Button asChild data-testid="button-login">
                  <a href="/api/login">Get Started</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute top-60 -left-40 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-3xl -z-10" />

          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Create a job-winning resume{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">in minutes!</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                Create an ATS-friendly, professional resume with our easy builder — trusted by top recruiters worldwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="h-14 px-10 text-lg shadow-xl shadow-primary/30" asChild data-testid="button-get-started">
                  <a href={user ? "/dashboard" : "/api/login"}>
                    Create New Resume <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg bg-white" data-testid="button-improve-resume" asChild>
                  <a href={user ? "/dashboard" : "/api/login"}>
                    Improve My Resume
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16"
            >
              <div className="text-center p-4">
                <div className="text-3xl sm:text-4xl font-bold text-slate-900">
                  <AnimatedCounter end={12848} />
                </div>
                <p className="text-sm text-slate-500 mt-1">resumes created today</p>
              </div>
              <div className="text-center p-4 border-x border-slate-200">
                <div className="text-3xl sm:text-4xl font-bold text-primary">x2.2</div>
                <p className="text-sm text-slate-500 mt-1">more interview invitations</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl sm:text-4xl font-bold text-green-600">+43%</div>
                <p className="text-sm text-slate-500 mt-1">higher chance of getting a job</p>
              </div>
            </motion.div>

            {/* Resume Preview Cards */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative flex justify-center items-end gap-4 h-[300px] sm:h-[400px]"
            >
              <div className="absolute w-48 sm:w-56 h-64 sm:h-80 bg-white rounded-xl shadow-2xl border border-slate-200 -rotate-6 transform hover:rotate-0 transition-transform duration-500 overflow-hidden left-1/2 -translate-x-[140%]">
                <div className="h-full bg-gradient-to-b from-slate-100 to-white p-4">
                  <div className="w-12 h-12 rounded-full bg-slate-300 mb-3" />
                  <div className="h-3 bg-slate-300 rounded mb-2 w-3/4" />
                  <div className="h-2 bg-slate-200 rounded mb-4 w-1/2" />
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-200 rounded w-full" />
                    <div className="h-2 bg-slate-200 rounded w-5/6" />
                    <div className="h-2 bg-slate-200 rounded w-4/5" />
                  </div>
                </div>
              </div>
              
              <div className="w-56 sm:w-64 h-72 sm:h-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-10 overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="h-full bg-gradient-to-b from-primary/10 to-white p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/20" />
                    <div>
                      <div className="h-3 bg-primary/30 rounded mb-1 w-20" />
                      <div className="h-2 bg-slate-200 rounded w-16" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-primary/20 rounded w-1/3 mb-4" />
                    <div className="h-2 bg-slate-200 rounded w-full" />
                    <div className="h-2 bg-slate-200 rounded w-5/6" />
                    <div className="h-2 bg-slate-200 rounded w-4/5" />
                    <div className="h-2 bg-primary/20 rounded w-1/3 mt-4 mb-2" />
                    <div className="h-2 bg-slate-200 rounded w-full" />
                    <div className="h-2 bg-slate-200 rounded w-3/4" />
                  </div>
                </div>
              </div>
              
              <div className="absolute w-48 sm:w-56 h-64 sm:h-80 bg-white rounded-xl shadow-2xl border border-slate-200 rotate-6 transform hover:rotate-0 transition-transform duration-500 overflow-hidden left-1/2 translate-x-[40%]">
                <div className="h-full bg-gradient-to-b from-purple-50 to-white p-4">
                  <div className="w-full h-16 bg-purple-100 rounded-lg mb-3 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-purple-200" />
                  </div>
                  <div className="h-3 bg-purple-200 rounded mb-2 w-2/3 mx-auto" />
                  <div className="h-2 bg-slate-200 rounded mb-4 w-1/2 mx-auto" />
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-200 rounded w-full" />
                    <div className="h-2 bg-slate-200 rounded w-5/6" />
                    <div className="h-2 bg-slate-200 rounded w-4/5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trusted By */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 text-center"
          >
            <p className="text-sm text-slate-500 mb-6">Our resumes got candidates hired by top companies</p>
            <div className="flex justify-center items-center gap-8 sm:gap-12 flex-wrap opacity-50 grayscale">
              <div className="text-2xl font-bold text-slate-400">Google</div>
              <div className="text-2xl font-bold text-slate-400">Microsoft</div>
              <div className="text-2xl font-bold text-slate-400">Amazon</div>
              <div className="text-2xl font-bold text-slate-400">Apple</div>
              <div className="text-2xl font-bold text-slate-400">Meta</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">What Our Users Say</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-slate-600 font-medium">Excellent</span>
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
                <Card className="p-8 sm:p-10 bg-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[testimonialIndex].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{testimonials[testimonialIndex].name}</h4>
                      <p className="text-sm text-slate-500">{testimonials[testimonialIndex].role}</p>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed">"{testimonials[testimonialIndex].content}"</p>
                  <p className="text-sm text-slate-400 mt-4">{testimonials[testimonialIndex].time}</p>
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
                    className={`w-2 h-2 rounded-full transition-colors ${i === testimonialIndex ? 'bg-primary' : 'bg-slate-300'}`}
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
      <section id="templates" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Resume Templates That Get You{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Noticed & Hired</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
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
                <div className="aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl">
                  <div className={`h-full p-3 bg-gradient-to-b ${
                    i === 0 ? 'from-blue-50 to-white' :
                    i === 1 ? 'from-purple-50 to-white' :
                    i === 2 ? 'from-green-50 to-white' :
                    i === 3 ? 'from-orange-50 to-white' :
                    'from-pink-50 to-white'
                  }`}>
                    <div className={`w-8 h-8 rounded-full mb-2 ${
                      i === 0 ? 'bg-blue-200' :
                      i === 1 ? 'bg-purple-200' :
                      i === 2 ? 'bg-green-200' :
                      i === 3 ? 'bg-orange-200' :
                      'bg-pink-200'
                    }`} />
                    <div className="h-2 bg-slate-200 rounded w-3/4 mb-1" />
                    <div className="h-1.5 bg-slate-100 rounded w-1/2 mb-3" />
                    <div className="space-y-1.5">
                      <div className="h-1.5 bg-slate-100 rounded w-full" />
                      <div className="h-1.5 bg-slate-100 rounded w-5/6" />
                      <div className="h-1.5 bg-slate-100 rounded w-4/5" />
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
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Why Choose Our Resume Builder</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
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
                <Card className="p-6 h-full hover:shadow-lg transition-shadow bg-white">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">4 Easy Steps to Create a Resume</h2>
            <p className="text-slate-600">Get your professional resume ready in minutes.</p>
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
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
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
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-xl border px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline py-5" data-testid={`button-faq-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-5">
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
      <footer className="py-12 bg-slate-900">
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
