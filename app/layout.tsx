import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Earning Pro Platform",
  description:
    "Professional blog and web tools platform with modern SEO-first architecture.",
  verification: {
    google: "z_DpQ8wwG4ykJbw_rrLglpPjZnEew2Qf79vCrjGo1V8",
  },
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <SiteHeader />
          <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-10">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
        <Script
          src="https://pl29279758.profitablecpmratenetwork.com/56/9a/4e/569a4e9ad4f81c18d07af152001160ed.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
