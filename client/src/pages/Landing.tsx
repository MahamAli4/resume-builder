import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Sparkles, Layout, ArrowRight } from "lucide-react";

export default function Landing() {
  const { user, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <FileText size={20} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900">ResuMakers</span>
            </div>
            <div>
              {isLoading ? (
                <div className="w-24 h-9 bg-slate-100 rounded animate-pulse" />
              ) : user ? (
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              ) : (
                <Button asChild>
                  <a href="/api/login">Login / Sign Up</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Background Decorative Blob */}
          <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl -z-10" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <Sparkles size={14} />
                <span>AI-Enhanced Resume Builder</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 leading-[1.1] mb-6">
                Craft your career <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">masterpiece.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                Create professional, ATS-friendly resumes in minutes. Choose from our crafted templates and land your dream job faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/25" asChild>
                  <a href={user ? "/dashboard" : "/api/login"}>
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-white">
                  View Templates
                </Button>
              </div>
            </motion.div>

            {/* Hero Image / Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white bg-white rotate-3 hover:rotate-0 transition-transform duration-500 ease-out">
                {/* Simulated Resume Preview */}
                <img 
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80" 
                  alt="Resume Builder Preview" 
                  className="w-full h-auto object-cover opacity-90" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="font-bold text-lg">Modern Professional Template</p>
                    <p className="text-white/80 text-sm">Most popular choice for 2025</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-900">Why Choose ResuMakers?</h2>
            <p className="text-slate-600 mt-4">Everything you need to build a standout resume.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Layout size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Professional Templates</h3>
              <p className="text-slate-600">
                Designed by HR experts to get past ATS filters and catch recruiters' eyes.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Live Preview</h3>
              <p className="text-slate-600">
                See changes instantly as you type. Switch templates with a single click.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">PDF Export</h3>
              <p className="text-slate-600">
                Download high-quality PDFs ready for application submissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">© 2024 ResuMakers. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-primary transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-primary transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
