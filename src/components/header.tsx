"use client";

import { AlertTriangle, Bell, BookMarkedIcon, BookOpen, CheckCircle2, ChevronDown, LogOut, User, User2 } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { Button } from "./ui/button";
import DarkModeToggle from "./dark-mode-toggle";
import { useUser } from "@/context/user-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User as UserType } from "@/types/user";
import { Badge } from "./ui/badge";

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

                        <SearchInput />
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-4">
                        <nav>
                            <Link
                                prefetch={false}
                                href={user ? "/my-courses" : "/"}
                                className="flex space-x-2 items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors md:border md:border-border md:rounded-md md:px-4 md:py-2"
                            >
                                <BookMarkedIcon className="h-4 w-4" />
                                <span className="hidden md:block">My Courses</span>
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
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors md:border md:border-border md:rounded-md md:px-4 md:py-2"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}


interface UserAvatarProps {
    user: UserType,
    logout: () => void
}

function UserAvatar({ user, logout }: UserAvatarProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.picture} />
                            <AvatarFallback>
                                <User2 className="h-4 w-4" />
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium max-w-[120px] truncate">
                            {user.name}
                        </span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function Notification() {
    const notifications = [
        { id: 1, type: 'success', text: 'You have a new message', read: false },
        { id: 2, type: 'warning', text: 'System update coming soon', read: true },
        { id: 3, type: 'info', text: 'Your weekly report is ready', read: true },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full p-2">
                    <Bell className="h-5 w-5" />
                    {notifications.some(n => !n.read) && (
                        <Badge
                            variant="destructive"
                            className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full p-2"
                        >
                            {notifications.filter(n => !n.read).length}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <div className="p-2">
                    <h3 className="text-sm font-semibold px-2">Bildirimler</h3>

                    {notifications.length === 0 ? (
                        <div className="flex items-center justify-center p-4 text-muted-foreground">
                            <span className="text-sm">Bildirim yok</span>
                        </div>
                    ) : (
                        <>
                            {notifications.map((notification) => (
                                <DropdownMenuItem
                                    key={notification.id}
                                    className={`flex items-start gap-3 p-2 cursor-pointer ${!notification.read ? 'bg-accent' : ''
                                        }`}
                                >
                                    <div className="flex-shrink-0">
                                        {notification.type === 'success' ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        ) : notification.type === 'warning' ? (
                                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                        ) : (
                                            <Bell className="h-5 w-5 text-blue-500" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm">{notification.text}</p>
                                        <span className="text-xs text-muted-foreground">
                                            2 saat önce
                                        </span>
                                    </div>
                                    {!notification.read && (
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}