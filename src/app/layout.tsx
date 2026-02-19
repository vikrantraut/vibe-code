import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HealthyBowl – Healthy Salad Recipes & Chicken Salad Ideas",
    template: "%s | HealthyBowl",
  },
  description:
    "Discover easy, nutritious salad recipes: healthy salads, chicken salads, weight loss salads, and quick 10-minute ideas. Fresh, delicious, and good for you.",
  keywords: [
    "healthy salad recipes",
    "chicken salad recipe",
    "high protein salad",
    "weight loss salads",
    "quick healthy lunch",
  ],
  openGraph: {
    title: "HealthyBowl – Healthy Salad Recipes",
    description: "Easy, nutritious salad recipes for every goal.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col font-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
