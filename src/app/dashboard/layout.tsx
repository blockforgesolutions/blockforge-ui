'use client'

import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const { user } = useUser();
    const router = useRouter();
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            router.push("/");
        } else if (user === null) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [user, router]);

    if (loading) {
        return null;
    }

    return (
        <ThemeProvider>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1"> {children} </main>
            </div>
        </ThemeProvider>
    );
}
