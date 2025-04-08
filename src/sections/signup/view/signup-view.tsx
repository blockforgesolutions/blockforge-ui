'use client'
import { useState } from "react";
import { cn } from "@/lib/utils";
import { UserInfoForm } from "../signup-form";
import { ProfilePictureForm } from "../profile-picture-form";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { AuthResponse } from "@/types/auth";

type SignUpFlowProps = React.ComponentPropsWithoutRef<"div">;

export function SignUpView({ className, ...props }: SignUpFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<User>();
  const router = useRouter();
  
  const handleUserInfoSubmit = (data: AuthResponse) => {
    setUserData(data.user);
    setCurrentStep(1);
  };
  
  const handleProfileSetupComplete = () => {
    router.push("/email-verification");
  };

  return (
    <div className={cn(className)} {...props}>
      {currentStep === 0 ? (
        <UserInfoForm onSubmitSuccess={handleUserInfoSubmit} />
      ) : (
        <ProfilePictureForm 
          userData={userData as User} 
          onComplete={handleProfileSetupComplete}
        />
      )}
    </div>
  );
}