"use client";

import { BookMarkedIcon, BookOpen, Menu } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "../search-input";
import { Button } from "../ui/button";
import DarkModeToggle from "../dark-mode-toggle";
import { useUser } from "@/context/user-context";
import { Notification } from "./notifications";
import { UserAvatar } from "./user-avatar";
import { MobileMenu } from "./mobile-header";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { VisuallyHidden } from "../visually-hidden";

export default function Header() {
    const { user, setUser } = useUser();

    const logout = () => {
        setUser(null);
        localStorage.removeItem("access_token");
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            prefetch={false}
                            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
                        >
                            <BookOpen className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                                Web3 Wanderers
                            </span>
                        </Link>

                        <div className="hidden md:flex">
                            <SearchInput />
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <nav>
                            <Link
                                prefetch={false}
                                href={user ? "/dashboard/my-courses" : "/"}
                                className="flex space-x-2 items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-4 py-2"
                            >
                                <BookMarkedIcon className="h-4 w-4" />
                                <span>My Courses</span>
                            </Link>
                        </nav>

                        <DarkModeToggle />

                        {user ? (
                            <>
                                <Notification />
                                <UserAvatar user={user} logout={logout} />
                            </>
                        ) : (
                            <Link
                                href="/"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-4 py-2"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                                <SheetHeader>
                                    <VisuallyHidden>
                                        <SheetTitle>Menu</SheetTitle>
                                    </VisuallyHidden>
                                </SheetHeader>
                                <MobileMenu user={user!} logout={logout} />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}