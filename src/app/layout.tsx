import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainLayout from "@/components/layout/MainLayout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Ayla Şentürk - Portfolio",
    template: "%s | Ayla Şentürk",
  },
  description:
    "Ayla Şentürk'ün kişisel portfolio web sitesi. HTML, CSS, JavaScript ve React ile oluşturulmuş interaktif bileşenler, üretkenlik araçları ve projeler.",
  keywords: [
    "Ayla Şentürk",
    "portfolio",
    "web geliştirici",
    "frontend",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Ayla Şentürk" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Ayla Şentürk Portfolio",
    title: "Ayla Şentürk - Portfolio",
    description:
      "Kişisel portfolio web sitesi - İnteraktif bileşenler, üretkenlik araçları ve projeler.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
