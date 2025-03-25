'use client';
import { ThemeProvider } from "@/components/theme-provider";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUser();
    const router = useRouter();
    
    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user, router])

    if (!user) {
        return null;
    }

    return (
        <ThemeProvider>
            <div className="min-h-screen flex flex-col">
                <div> Navbar </div>
                <main className="flex-1"> {children} </main>
            </div>
        </ThemeProvider>
    );
}
