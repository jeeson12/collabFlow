import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provideer";
import { AuthProvider } from "@/features/auth/authProvider";
import { Toaster } from "sonner";
import { OfflineOverlay } from "@/components/shared/OfflineOverlay";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProjectLoom",
  description: "Team collaboration platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <AuthProvider>
            <OfflineOverlay />
            {children}
            <Toaster position="bottom-right" richColors />
          </AuthProvider>
        </QueryProvider>

        <GoogleAnalytics gaId="G-J4QGGTG6EC" />
      </body>
    </html>
  );
}
