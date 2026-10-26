import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MotionProvider } from "@/components/motion";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { company } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const mono = JetBrains_Mono({ variable: "--font-mono-jb", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.name} | Electrical Solutions & Solar EPC in Kochi`,
    template: `%s | ${company.name}`,
  },
  description:
    "AVIGENT Technologies, Kakkanad, Kochi — electrical maintenance, safety audits, engineering consultancy and renewable energy EPC. Powering progress since 2012.",
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.name,
  formatDetection: { telephone: true, email: true, address: true },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: company.name,
    images: [{ url: "/images/hero-energy.jpg", width: 1376, height: 768 }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060d1e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${grotesk.variable} ${mono.variable} antialiased`}>
      <body className="flex min-h-screen flex-col overflow-x-clip">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
        </MotionProvider>
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
