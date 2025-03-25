import { SignUpForm } from "@/components/signup-form";


export default function SignUpPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <SignUpForm className="w-full max-w-md" />
        </div>
    );
}