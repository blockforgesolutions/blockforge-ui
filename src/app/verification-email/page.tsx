import { VerificationEmail } from "@/components/verification-email";

export default function VerificationEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md mt-10">
        <VerificationEmail />
      </div>
    </div>
  );
}