import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IRCTC Redesign — Book Train Tickets",
  description: "A modern, mobile-first redesign of the IRCTC train booking experience.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1a365d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Desktop: center the mobile frame */}
        <div className="min-h-dvh bg-gray-100 md:flex md:items-start md:justify-center md:py-8">
          <div className="page-container md:rounded-2xl md:shadow-xl md:overflow-hidden md:min-h-[90dvh] md:max-h-[90dvh] md:overflow-y-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
