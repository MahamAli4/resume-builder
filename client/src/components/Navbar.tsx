import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { FileText, Sun, Moon, Pencil, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
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
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full w-9 h-9">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
    );
}

export function Navbar() {
    const { user, logout, isLoading } = useAuth();
    const [location] = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLandingPage = location === "/";
    const getLink = (id: string) => isLandingPage ? id : `/${id}`;

    const navLinks = [
        { name: "Features", href: getLink("#features") },
        { name: "Templates", href: getLink("#templates") },
        { name: "Reviews", href: getLink("#testimonials") },
        { name: "FAQ", href: getLink("#faq") },
    ];

    useEffect(() => setIsMenuOpen(false), [location]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-lg">
                            <FileText size={20} />
                        </div>
                        <span className="font-bold text-xl tracking-tight">ResuMakers</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">{link.name}</a>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <div className="hidden md:flex items-center gap-3 ml-2">
                            {isLoading ? (
                                <div className="w-24 h-9 bg-muted rounded-lg animate-pulse" />
                            ) : user ? (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 pr-3 border-r border-border h-8">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt="P" className="w-8 h-8 rounded-full border border-border" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[11px] font-bold border border-primary/20">
                                                {user.displayName?.[0] || user.email?.[0]?.toUpperCase() || "U"}
                                            </div>
                                        )}
                                        <span className="text-xs font-semibold text-foreground/80 hidden lg:block">{user.displayName || "User"}</span>
                                    </div>
                                    {location !== "/dashboard" ? (
                                        <Link href="/dashboard"><Button size="sm" className="shadow-lg h-9">Dashboard</Button></Link>
                                    ) : (
                                        <Button variant="ghost" size="sm" onClick={() => logout()} className="h-9 hover:text-red-500 transition-colors">
                                            <LogOut className="w-4 h-4 mr-2" /> Logout
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" asChild size="sm"><Link href="/auth">Log in</Link></Button>
                                    <Button asChild size="sm" className="shadow-lg"><Link href="/auth"><Pencil className="w-4 h-4 mr-2" />Build resume</Link></Button>
                                </div>
                            )}
                        </div>
                        <Button variant="ghost" size="icon" className="md:hidden ml-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </Button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-background border-b border-border p-4 space-y-4 animate-in slide-in-from-top duration-200">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="block text-base font-medium px-2 py-2">{link.name}</a>
                    ))}
                    <div className="pt-4 border-t border-border space-y-3">
                        {user ? (
                            <><Link href="/dashboard" className="block"><Button className="w-full">Dashboard</Button></Link>
                                <Button variant="outline" className="w-full text-red-500" onClick={() => logout()}><LogOut className="w-4 h-4 mr-2" /> Logout</Button>
                            </>
                        ) : (
                            <><Link href="/auth" className="block"><Button variant="outline" className="w-full">Log in</Button></Link>
                                <Link href="/auth" className="block"><Button className="w-full">Build My Resume</Button></Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
