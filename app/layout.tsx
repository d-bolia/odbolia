import type { Metadata } from "next"
import { Geist_Mono, Space_Grotesk, Chakra_Petch, DM_Sans, Inter } from "next/font/google"
import "./globals.css"

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["500", "600"],
})

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  weight: ["400", "500"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
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
    <html lang="en" className={`${geistMono.variable} ${spaceGrotesk.variable} ${chakraPetch.variable} ${dmSans.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
