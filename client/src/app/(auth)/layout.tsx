import Link from "next/link";
import { FolderKanban } from "lucide-react";

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
            <span className="text-2xl font-serif font-bold tracking-tight">CollabFlow</span>
          </Link>
        </div>

        <div>
          <h1 className="text-4xl xl:text-5xl font-serif font-bold leading-tight tracking-tight mb-6">
            Focus on the work,<br />not the workflow.
          </h1>
          <p className="text-lg xl:text-xl text-white/80 max-w-xl leading-relaxed">
            Stop switching between scattered tools. CollabFlow provides a single, secure workspace where your team can manage tasks, share context, and hit every deadline without breaking a sweat.
          </p>
        </div>

        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} CollabFlow. All rights reserved.
        </div>
      </div>

      {/* 40% Side - Forms */}
      <div className="flex w-full lg:w-[40%] flex-col justify-center bg-[#F2F2F2] lg:bg-white">
        {/* Mobile Header (Only visible on small screens) */}
        <div className="flex items-center gap-2 p-6 lg:hidden">
          <FolderKanban className="size-6 text-[#063325]" />
          <span className="text-xl font-serif font-bold tracking-tight text-[#063325]">CollabFlow</span>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
