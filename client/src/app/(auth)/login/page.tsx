import { LoginForm } from "@/features/auth/components/login-form";

export default function loginPage() {
  return (
    <div className="flex w-full justify-center p-4 sm:p-8">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
