import "./globals.css";
import { LucideKanban } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { homePath, ticketsPath } from "@/paths";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Road To Next",
  description: "My Road to Next application...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="fixed left-0 top-0 right-0 w-full z-20 border-b flex items-center justify-between py-2.5 px-5 bg-background/55 backdrop-blur-sm supports-backdrop-blur:bg-background/60">
          <div>
            <Button asChild variant={"ghost"}>
              <Link href={homePath()}>
                <LucideKanban />
                <h1 className="text-lg font-semibold">TicketBounty</h1>
              </Link>
            </Button>
          </div>
          <div>
            <Link
              href={ticketsPath()}
              className={buttonVariants({ variant: "default" })}
            >
              Tickets
            </Link>
          </div>
        </nav>
        <main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden py-24 px-8 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
