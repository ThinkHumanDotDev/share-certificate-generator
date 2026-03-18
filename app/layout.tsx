import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL ?? "https://localhost:3000"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  title:
    "Share Certificate Generator: Create Professional Share Certificates",
  description:
    "Generate professional share certificates for free. Create customized, print-ready share certificates in seconds.",
  keywords: [
    "share certificate generator",
    "free share certificate",
    "share certificate maker",
    "equity certificate",
    "stock certificate",
  ],
  robots: "index, follow",
  openGraph: {
    title:
      "Share Certificate Generator: Create Professional Share Certificates",
    description:
      "Generate professional share certificates for free. Create customized, print-ready share certificates in seconds.",
    url: process.env.NEXT_PUBLIC_URL,
    type: "website",
    images: "/og-image.jpeg",
    siteName: "Share Certificate Generator",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f97316" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body className={`${GeistSans.className}`}>{children}</body>
    </html>
  );
}
