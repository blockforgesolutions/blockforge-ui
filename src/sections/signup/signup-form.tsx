/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from "react";
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
import { signup } from "@/services/auth";
import Link from "next/link";
import { AuthResponse } from "@/types/auth";

interface UserInfoFormProps {
  className?: string;
  onSubmitSuccess: (data: AuthResponse) => void;
}

export function UserInfoForm({ className, onSubmitSuccess }: UserInfoFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [rePassword, setRePassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (formData.password !== rePassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await signup(formData);
      localStorage.setItem("access_token", response.access_token);
      onSubmitSuccess(response);
    } catch (err:any) {
      if(err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      }
    }
    
    setIsLoading(false);
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your details below to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="user-info-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 w-full">
              <div className="grid gap-2 w-full">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your first name"
                  required
                />
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Your last name"
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="m@example.com"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                name="rePassword"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)} 
                required 
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button 
          type="submit" 
          form="user-info-form"
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Continue"}
        </Button>
        
        <Button variant="outline" className="w-full">
          Sign Up with Google
        </Button>
        
        <div className="w-full text-center text-sm">
          Already have an account?{" "}
          <Link href="/" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}