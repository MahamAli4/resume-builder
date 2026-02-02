import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { FileText } from "lucide-react";

const authSchema = z.object({
    username: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormData = z.infer<typeof authSchema>;

export default function AuthPage() {
    const { user, login, register } = useAuth();
    const [_, setLocation] = useLocation();

    useEffect(() => {
        if (user) {
            setLocation("/dashboard");
        }
    }, [user, setLocation]);

    const loginForm = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
        defaultValues: { username: "", password: "" },
    });

    const registerForm = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
        defaultValues: { username: "", password: "" },
    });

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="flex items-center gap-2 justify-center mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-lg">
                            <FileText size={24} />
                        </div>
                        <span className="font-bold text-2xl tracking-tight">ResuMakers</span>
                    </div>

                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Welcome back</CardTitle>
                                    <CardDescription>Enter your email to sign in to your account</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form {...loginForm}>
                                        <form onSubmit={loginForm.handleSubmit((data) => login(data))} className="space-y-4">
                                            <FormField
                                                control={loginForm.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="name@example.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={loginForm.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Password</FormLabel>
                                                        <FormControl>
                                                            <Input type="password" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                                                {loginForm.formState.isSubmitting ? "Signing in..." : "Sign In"}
                                            </Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="register">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Create an account</CardTitle>
                                    <CardDescription>Enter your email below to create your account</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form {...registerForm}>
                                        <form onSubmit={registerForm.handleSubmit((data) => register(data))} className="space-y-4">
                                            <FormField
                                                control={registerForm.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="name@example.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={registerForm.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Password</FormLabel>
                                                        <FormControl>
                                                            <Input type="password" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit" className="w-full" disabled={registerForm.formState.isSubmitting}>
                                                {registerForm.formState.isSubmitting ? "Creating account..." : "Sign Up"}
                                            </Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <div className="hidden lg:block relative bg-muted">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 opacity-90" />
                <div className="relative h-full flex items-center justify-center p-12 text-white">
                    <div className="max-w-xl space-y-6">
                        <h2 className="text-4xl font-bold">Start building your career today</h2>
                        <p className="text-lg opacity-90">
                            Create professional resumes, stand out to recruiters, and land your dream job with our AI-powered resume builder.
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-8">
                            <div className="p-4 rounded-lg bg-white/10 backdrop-blur">
                                <h3 className="font-bold text-xl mb-2">ATS-Friendly</h3>
                                <p className="text-sm opacity-80">Templates designed to pass automated screening systems.</p>
                            </div>
                            <div className="p-4 rounded-lg bg-white/10 backdrop-blur">
                                <h3 className="font-bold text-xl mb-2">Real-time Preview</h3>
                                <p className="text-sm opacity-80">See your changes instantly as you edit your resume.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
