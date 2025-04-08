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

interface VerificationEmailProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function VerificationEmail({
  className,
  ...props
}: VerificationEmailProps) {
  const router = useRouter();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Your Email Has Been Successfully Verified!</CardTitle>
          <CardDescription>
          Click below to continue to the homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <Button
              className="w-full"
              onClick={() => router.push("/dashboard")}
            >
              Continue to Homepage
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
              Would you like to log in again? Log In{" "}
            <a href="/" className="underline underline-offset-4">
              Login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}