import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppShareButton } from "@/components/whatsapp-share-button";
import { PwaRegister } from "@/components/pwa-register";

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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Earning Pro",
  },
  verification: {
    google: "z_DpQ8wwG4ykJbw_rrLglpPjZnEew2Qf79vCrjGo1V8",
    other: {
      "p:domain_verify": ["77a2ce9fca1c7058f559e28810fd52c8"],
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
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
          <WhatsAppShareButton />
          <PwaRegister />
        </ThemeProvider>
        <Script
          src="https://pl29279758.profitablecpmratenetwork.com/56/9a/4e/569a4e9ad4f81c18d07af152001160ed.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
