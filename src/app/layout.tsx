import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { TRPCReactProvider } from "@/trpc/client"
import { Toaster } from "sonner"
import { ThemeProvider } from "next-themes"
import { ClerkProvider } from "@clerk/nextjs"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Vibe | Build with AI",
  description: "Vibe lets you create apps and websites by chatting with AI. Instantly generate, deploy, and manage your projects with ease.",
  keywords: [
    "AI app builder",
    "AI website builder",
    "Vibe",
    "No-code",
    "Chat-based development",
    "AI tools",
    "Next.js",
    "Web development",
    "App generator"
  ],
  authors: [{ name: "Vibe Team", url: "https://vibe.example.com" }],
  creator: "Vibe Team",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: { index: true, follow: true, noimageindex: false },
  },
  themeColor: "#C96342",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Vibe | Build with AI",
    description: "Create apps and websites by chatting with AI. Instantly generate, deploy, and manage your projects with Vibe.",
    url: "https://vibe.example.com",
    siteName: "Vibe",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Vibe Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe | Build with AI",
    description: "Create apps and websites by chatting with AI. Instantly generate, deploy, and manage your projects with Vibe.",
    site: "@vibeai", // Replace with actual Twitter handle if available
    creator: "@vibeai", // Replace with actual Twitter handle if available
    images: [
      {
        url: "/logo.png",
        alt: "Vibe Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://vibe.example.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      appearance={{
        variables: {
          colorPrimary: "#C96342",
        }
      }}
    >
      <TRPCReactProvider>
        <html lang="en" suppressHydrationWarning>
          <head>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "Vibe",
                  "url": "https://vibable.vercel.app",
                  "logo": "https://vibable.vercel.app/logo.png",
                  "sameAs": [
                    "https://twitter.com/vibeai"
                  ]
                })
              }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Product",
                  "name": "Vibe",
                  "description": "Vibe lets you create apps and websites by chatting with AI. Instantly generate, deploy, and manage your projects with ease.",
                  "brand": {
                    "@type": "Brand",
                    "name": "Vibe"
                  },
                  "logo": "https://vibable.vercel.app/logo.png",
                  "url": "https://vibable.vercel.app"
                })
              }}
            />
          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem >
              <Toaster/>
              {children}
            </ThemeProvider>
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  )
}
