import { EmailVerificationSent } from "@/sections/email-verification/email-verification-sent";

export default function EmailVerificationSentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md mt-10">
        <EmailVerificationSent />
      </div>
    </div>
  );
}