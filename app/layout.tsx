import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://valid.hostagedown.com"),
  title: "Valid",
  description: "Validate your saas idea with intelligent analysis",
  openGraph: {
    title: "Valid",
    description: "Validate your saas idea with intelligent analysis",
    url: "/",
    siteName: "Valid",
    images: [
      {
        url: "/placeholder.png",
        width: 1200,
        height: 630,
        alt: "Valid – Validate your saas idea with intelligent analysis",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valid",
    description: "Validate your saas idea with intelligent analysis",
    images: ["/placeholder.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
