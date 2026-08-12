"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/features/sidebar";
import { Button } from "@/components/ui/button";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72 border-none">
        <div className="relative h-full w-full [&>aside]:static [&>aside]:h-full [&>aside]:w-full [&>aside]:flex!">
          <Sidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
}
