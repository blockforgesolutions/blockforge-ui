import { User as UserType } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell, BookMarkedIcon, LogOut, User, User2 } from "lucide-react";
import { SearchInput } from "../search-input";
import Link from "next/link";
import DarkModeToggle from "../dark-mode-toggle";
import { Badge } from "../ui/badge";

interface MobileMenuProps {
    user: UserType;
    logout: () => void;
}

export function MobileMenu({ user, logout }: MobileMenuProps) {
    return (
        <div className="flex flex-col h-full py-6">
            {user && (
                <div className="flex items-center gap-4 mb-6 px-2">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.picture} />
                        <AvatarFallback>
                            <User2 className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                </div>
            )}

            <div className="flex flex-col space-y-2 px-2 mb-6">
                <div className="mb-4">
                    <SearchInput />
                </div>

                <Link
                    href={user ? "/my-courses" : "/"}
                    prefetch={false}
                    className="flex items-center gap-3 py-3 px-3 text-sm rounded-md hover:bg-accent"
                >
                    <BookMarkedIcon className="h-5 w-5" />
                    <span>My Courses</span>
                </Link>

                <div className="flex items-center gap-3 py-3 px-3 text-sm rounded-md hover:bg-accent">
                    <span>Dark Mode</span>
                    <div className="ml-auto">
                        <DarkModeToggle />
                    </div>
                </div>

                {user && (
                    <>
                        <div className="flex items-center gap-3 py-3 px-3 text-sm rounded-md hover:bg-accent">
                            <Bell className="h-5 w-5" />
                            <span>Notifications</span>
                            {hasUnreadNotifications() && (
                                <Badge variant="destructive" className="ml-auto">
                                    {getUnreadCount()}
                                </Badge>
                            )}
                        </div>

                        <Link
                            href="/profile"
                            prefetch={false}
                            className="flex items-center gap-3 py-3 px-3 text-sm rounded-md hover:bg-accent"
                        >
                            <User className="h-5 w-5" />
                            <span>Profile</span>
                        </Link>
                    </>
                )}
            </div>

            {user ? (
                <button
                    onClick={logout}
                    className="flex items-center gap-3 py-3 px-5 text-sm rounded-md hover:bg-accent mt-auto"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                </button>
            ) : (
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 mt-auto mx-2"
                >
                    Sign In
                </Link>
            )}
        </div>
    );
}

export function hasUnreadNotifications() {
    const notifications = [
        { id: 1, type: 'success', text: 'You have a new message', read: false },
        { id: 2, type: 'warning', text: 'System update coming soon', read: true },
        { id: 3, type: 'info', text: 'Your weekly report is ready', read: true },
    ];
    return notifications.some(n => !n.read);
}

export function getUnreadCount() {
    const notifications = [
        { id: 1, type: 'success', text: 'You have a new message', read: false },
        { id: 2, type: 'warning', text: 'System update coming soon', read: true },
        { id: 3, type: 'info', text: 'Your weekly report is ready', read: true },
    ];
    return notifications.filter(n => !n.read).length;
}