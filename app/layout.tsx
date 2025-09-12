import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "NestBoost - Ship Secure NestJS Backends Faster",
  description:
    "Production-ready NestJS boilerplates with 2FA auth, Docker, TypeORM, and PostgreSQL. Ship secure backends in days, not weeks.",
  generator: "NestBoost",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
