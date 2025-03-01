import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

import { AppSidebar } from "@/components/AppSidebar";
import DarkModeToggle from "@/components/DarkModeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased` }>
        <div className="hidden lg:block fixed top-2 right-2 z-[150]">
          <DarkModeToggle />
        </div>
        <div className="dark:bg-[#262626]">
          <AppSidebar dashboard={children}>        
          </AppSidebar> 
        </div>
      </body>
    </html>
  );
}
