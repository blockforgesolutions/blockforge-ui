/* eslint-disable @next/next/no-html-link-for-pages */
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

// SignUpForm component: A form for user registration with fields for username, first name, last name, email, password, and password confirmation.
export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    // Main container for the form, using flexbox for layout and spacing
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Card component to wrap the form, using default shadcn/ui styles */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your details below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-4">
              {/* First Name field */}
              <div className="flex gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    type="text"
                    placeholder="Your first name"
                    required
                  />
                </div>
                {/* Last Name field */}
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    type="text"
                    placeholder="Your last name"
                    required
                  />
                </div>
              </div>
              {/* Email field */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              {/* Password field */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              {/* Confirm Password field */}
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              {/* Sign Up button */}
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              {/* Sign Up with Google button */}
              <Button variant="outline" className="w-full">
                Sign Up with Google
              </Button>
            </div>
            {/* Link to the login page for users who already have an account */}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}