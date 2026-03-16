import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { EnrollmentProvider } from "@/contexts/enrollment-context";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Inscrição de Treinamento - Requestia",
  description:
    "Trilha de Capacitação Requestia - Desenvolva suas habilidades com treinamento estruturado",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} font-sans antialiased bg-gradient-to-b from-[#f4f7fa] to-white`}
      >
        <EnrollmentProvider>{children}</EnrollmentProvider>
        <Analytics />
      </body>
    </html>
  );
}
