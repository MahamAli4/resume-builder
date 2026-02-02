import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
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
import { Navbar } from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

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

function StepCard({ step, index }: { step: { number: string; title: string; description: string }; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="group relative"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl p-8 shadow-xl transition-all duration-300 group-hover:shadow-primary/10 group-hover:border-primary/30 flex flex-col items-center text-center overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

        <div
          className="relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/25"
          style={{ transform: "translateZ(40px)" }}
        >
          {step.number}
        </div>
        <h3
          className="relative text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
          style={{ transform: "translateZ(30px)" }}
        >
          {step.title}
        </h3>
        <p
          className="relative text-muted-foreground leading-relaxed"
          style={{ transform: "translateZ(20px)" }}
        >
          {step.description}
        </p>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Zap size={40} className="text-primary" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Landing() {
  const { user, isLoading } = useAuth();
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [api]);

  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

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
                  <a href={user ? "/dashboard" : "/auth"}>
                    Improve my resume
                  </a>
                </Button>
                <Button size="lg" className="h-12 px-6 rounded-full shadow-lg shadow-primary/30" asChild data-testid="button-create-resume">
                  <a href={user ? "/dashboard" : "/auth"}>
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
            {/* Right Column - 3D Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex items-center justify-center p-8"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1000 }}
            >
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative z-20 w-full max-w-md mx-auto"
              >
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div
                    className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10"
                    style={{ transform: "translateZ(-50px)" }}
                  />
                  <img
                    src="/template/1.png"
                    alt="Resume Template Preview"
                    className="w-full h-auto rounded-xl shadow-2xl border-4 border-white/10"
                    style={{
                      transform: "translateZ(20px)",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                    }}
                  />

                  {/* Floating Elements on top of image */}
                  <motion.div
                    className="absolute -left-6 top-10 w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-lg border border-border"
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    style={{ transform: "translateZ(50px)" }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </motion.div>

                  <motion.div
                    className="absolute -right-4 bottom-20 w-14 h-14 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-lg border border-border"
                    animate={{ y: [0, 15, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    style={{ transform: "translateZ(60px)" }}
                  >
                    <Star className="w-7 h-7 text-yellow-500 fill-yellow-500" />
                  </motion.div>
                </motion.div>
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

          <div className="w-full max-w-5xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              setApi={setApi}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {Array.from({ length: 20 }).map((_, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      viewport={{ once: true }}
                      className="group relative cursor-pointer"
                    >
                      <div className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl bg-muted/20">
                        <img
                          src={`/template/${index + 1}.png`}
                          alt={`Resume Template ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button size="sm" variant="secondary" className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            Use Template
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>

          <div className="text-center mt-10">
            <Button size="lg" variant="outline" asChild data-testid="button-view-templates">
              <a href={user ? "/dashboard" : "/auth"}>
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
              <a href={user ? "/dashboard" : "/auth"}>
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
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild data-testid="button-create-resume-steps">
              <a href={user ? "/dashboard" : "/auth"}>
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
            <a href={user ? "/dashboard" : "/auth"}>
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
