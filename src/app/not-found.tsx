"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <Image src="/logo.svg" alt="Logo" width={64} height={64} className="mb-2" />
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="text-muted-foreground mb-4">Sorry, the page you are looking for does not exist.</p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}

export default NotFound 