import "./globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { IChildren } from "@/interface";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});


export const metadata: Metadata = {
  title: "Genify",
  description: "A modern AI tools where you can search and generate image, audio, video and many more...",
};

export default function RootLayout({ children }: Readonly<IChildren>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-slate-100 font-sans antialiased flex",
          fontSans.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
