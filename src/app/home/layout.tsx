import { ThemeProvider } from "@/components/theme-provider";

export default function UserLayout({children}: {children: React.ReactNode}) {
    return (
        <ThemeProvider>
            <div className="min-h-screen flex flex-col">
                <div> Navbar </div>
                <main className="flex-1"> {children} </main>
            </div>
        </ThemeProvider>
    )
}