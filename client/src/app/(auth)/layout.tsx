import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { AuthBranding } from "./auth-branding";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* 60% Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[60%] bg-[#063325] text-white flex-col justify-between p-12 xl:p-24 selection:bg-white selection:text-[#063325]">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <FolderKanban className="size-8" />
            <span className="text-2xl font-serif font-bold tracking-tight">ProjectLoom</span>
          </Link>
        </div>

        <AuthBranding />

        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} ProjectLoom. All rights reserved.
        </div>
      </div>

      {/* 40% Side - Forms */}
      <div className="flex w-full lg:w-[40%] flex-col bg-[#F2F2F2] lg:bg-white min-h-screen">
        {/* Mobile Header (Only visible on small screens) */}
        <div className="flex items-center gap-2 p-6 lg:hidden shrink-0">
          <FolderKanban className="size-6 text-[#063325]" />
          <span className="text-xl font-serif font-bold tracking-tight text-[#063325]">ProjectLoom</span>
        </div>

        {/* Form Container */}
        <div className="flex-1 py-4 lg:py-8 lg:flex lg:flex-col lg:justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
