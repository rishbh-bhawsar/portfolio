import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { profile } from "@/data/content";
import { CommandMenuProvider } from "@/components/ui/CommandMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// const siteUrl = "https://risheekshukla.dev";
const siteUrl = "https://rishbhbhawsar.dev";
const description =
  "Software Engineer focused on Angular applications, enterprise platforms, and scalable web solutions. Currently building production-grade products using Angular, TypeScript, and modern web technologies.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
  "Rishbh Bhawsar",
  "Software Engineer",
  "Angular Developer",
  "Senior Frontend Engineer",
  "Angular 12-16",
  "TypeScript",
  "NGXS",
  "Keycloak SSO",
  "Socket.IO",
  "Firebase",
  "Google Maps API",
  "AWS",
  "Enterprise Applications",
  "Scalable Web Applications",
  "Portfolio",
],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
    creator: "@rishbh_bhawsar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    image: `${siteUrl}/avatar.png`,
    sameAs: [profile.github, profile.linkedin].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CommandMenuProvider>{children}</CommandMenuProvider>
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(20, 25, 37, 0.9)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#e6e8ee",
              backdropFilter: "blur(8px)",
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
