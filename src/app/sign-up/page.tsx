import { SignUpForm } from "@/components/ui/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <SignUpForm className="w-full max-w-md" />
    </div>
  );
}