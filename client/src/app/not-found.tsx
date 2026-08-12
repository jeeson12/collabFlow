import Link from "next/link";
import { FolderSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <div className="flex max-w-md flex-col items-center space-y-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#063325]/10">
          <FolderSearch className="h-12 w-12 text-[#063325]" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-[#063325] font-serif">
            Page Not Found
          </h1>
          <p className="text-muted-foreground text-lg">
            We couldn't find the page you were looking for. It might have been moved or deleted.
          </p>
        </div>

        <Link href="/workspace">
          <Button className="bg-[#063325] hover:bg-[#052b1f] text-white px-8 h-12 rounded-full font-medium shadow-md transition-transform hover:scale-105 active:scale-95">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
