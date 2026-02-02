import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = { user, isLoading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { toast } = useToast();

    const login = async (data: any) => {
        try {
            await signInWithEmailAndPassword(auth, data.username, data.password);
            toast({ title: "Welcome back!" });
        } catch (error: any) {
            toast({
                title: "Login failed",
                description: error.message,
                variant: "destructive"
            });
            throw error;
        }
    };

    const register = async (data: any) => {
        try {
            await createUserWithEmailAndPassword(auth, data.username, data.password);
            toast({ title: "Account created successfully!" });
        } catch (error: any) {
            toast({
                title: "Registration failed",
                description: error.message,
                variant: "destructive"
            });
            throw error;
        }
    };

    const logout = async () => {
        try {
            await firebaseSignOut(auth);
            toast({ title: "Logged out successfully" });
        } catch (error: any) {
            toast({
                title: "Logout failed",
                description: error.message,
                variant: "destructive"
            });
        }
    };

    return {
        ...context,
        isAuthenticated: !!context.user,
        loginMutation: { mutateAsync: login },
        registerMutation: { mutateAsync: register },
        logoutMutation: { mutateAsync: logout },
        login,
        register,
        logout
    };
}
