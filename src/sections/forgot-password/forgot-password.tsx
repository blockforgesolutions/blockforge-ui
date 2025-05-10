"use client"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";

export function ForgotPassword({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Burada şifre sıfırlama işlemini gerçekleştirecek bir API çağrısı yapılabilir.
    alert("Password reset link sent to " + email);
  };

  return (
    <div className={cn("flex flex-col gap-8 p-6 max-w-lg mx-auto", className)} {...props}>
      <Card className="p-6 shadow-lg w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl">Forgot Password</CardTitle>
          <CardDescription className="text-lg">
            Enter your email below to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-lg">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 text-lg"
                />
              </div>
              <Button type="submit" className="w-full text-lg py-3">
                Send Reset Link
              </Button>
            </div>
            <div className="mt-6 text-center text-lg">
              Remembered your password? {" "}
              <Link href="/" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}