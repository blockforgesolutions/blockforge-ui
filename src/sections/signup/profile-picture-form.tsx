'use client'
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types/user";
import { uploadProfilePicture } from "@/services/auth";

interface ProfilePictureFormProps {
    className?: string;
    userData: User;
    onComplete: () => void;
}

export function ProfilePictureForm({
    className,
    userData,
    onComplete
}: ProfilePictureFormProps) {
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfilePicture(file);

            const reader = new FileReader();
            reader.onload = () => {
                setProfilePicturePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profilePicture) {
            onComplete();
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append('picture', profilePicture);
            formData.append('userId', userData.id);
            console.log(formData);
            
            const response = await uploadProfilePicture(formData);
            console.log(response);
            onComplete();
        } catch (err) {
            console.error("Error uploading profile picture:", err);
            setError("Failed to upload profile picture. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSkip = () => {
        onComplete();
    };

    return (
        <Card className={cn("w-full", className)}>
            <CardHeader>
                <CardTitle className="text-2xl">Profile Picture</CardTitle>
                <CardDescription>
                    Add a profile picture to personalize your account (optional)
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="profile-picture-form" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center justify-center gap-6 py-4">
                        {profilePicturePreview ? (
                            <div className="relative w-40 h-40 rounded-full overflow-hidden border border-gray-200">
                                <Image
                                    src={profilePicturePreview}
                                    alt="Profile preview"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        ) : (
                            <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
                                <span className="text-gray-400">No image</span>
                            </div>
                        )}

                        <div className="flex flex-col items-center gap-2 w-full">
                            <Label
                                htmlFor="picture-upload"
                                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                            >
                                {profilePicture ? "Change Image" : "Select Image"}
                            </Label>
                            <Input
                                id="picture-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                className="hidden"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Recommended: Square image, at least 300x300 pixels
                            </p>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm mt-2">{error}</div>
                        )}
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <div className="gap-2 w-full">
                    <Button
                        type="submit"
                        form="profile-picture-form"
                        className="w-full cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading ? "Uploading..." : "Complete"}
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full text-gray-500 mt-2 cursor-pointer"
                        onClick={handleSkip}
                        type="button"
                    >
                        Skip this step
                    </Button>

                </div>

            </CardFooter>
        </Card>
    );
}