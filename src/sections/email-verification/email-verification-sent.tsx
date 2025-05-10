"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface EmailVerificationSentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function EmailVerificationSent({
  className,
  ...props
}: EmailVerificationSentProps) {
  const router = useRouter();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Email Verification Sent</CardTitle>
          <CardDescription>
             A verification link has been sent to your email address. Please check your inbox.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <p className="text-sm text-muted-foreground">
            If you don’t see the email, please check your spam or junk folder!
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/dashboard")}
            >
              Return to Homepage
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
          Would you like to log in again?{" "}
            <Link href="/" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}