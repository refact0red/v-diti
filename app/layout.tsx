import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://v-diti.vercel.app"),
  title: "Aditi, Will You Be My Valentine? 💕",
  description: "I have a very important question for you...",
  openGraph: {
    title: "Aditi, Will You Be My Valentine? 💕",
    description: "Someone special has a question for you! 🐻💝",
    type: "website",
    siteName: "Valentine",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditi, Will You Be My Valentine? 💕",
    description: "Someone special has a question for you! 🐻💝",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ff69b4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased h-dvh">
        {children}
      </body>
    </html>
  );
}
