import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import "./globals.css"

// Geist Mono — variable font (100–900), rounded terminals, geometric
// Closest freely available match to Proto Mono's aesthetic
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Desmond Bolia — Electrical Engineer",
  description:
    "Portfolio of Desmond Bolia, Electrical Engineer (B.S. EE, UC Irvine) specializing in semiconductor and optoelectronics.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistMono.variable}>
      <body>{children}</body>
    </html>
  )
}
