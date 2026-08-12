import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <div className="flex w-full flex-col p-4 sm:p-8">
      <div className="w-full max-w-sm mx-auto mb-6">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#111827]/60 transition-colors hover:text-[#063325]"
        >
          <ArrowLeft className="size-4" />
          Back to login
        </Link>
      </div>
      <div className="flex w-full justify-center">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
