"use client"

import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { UserControl } from "@/components/user-control"
import { UserControlSkeleton } from "@/components/user-control"
import { useScroll } from "@/hooks/use-scroll"
import { cn } from "@/lib/utils"
import { CrownIcon } from "lucide-react"
import { useUser } from "@clerk/nextjs"

export const Navbar = () => {
  const isScrolled = useScroll()
  
  const { has } = useAuth()
  const hasPro = has?.({plan: "pro"})
  const {  isLoaded } = useUser()

  return (
    <nav className={cn("p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent", isScrolled && "bg-background border-border")}> 
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg"  alt="vibe" width={24} height={24}/>
          <span className="font-semibold text-lg">Vibe</span>
        </Link>
        {!isLoaded ? (
          <div className="flex gap-4 items-center">
            <div className="h-8 w-24 rounded-md bg-accent animate-pulse" />
            <UserControlSkeleton showName={true}/>
          </div>
        ) : (
          <>
            <SignedOut>
              <div className="flex gap-2">
                <SignUpButton>
                  <Button variant={"outline"} size={"sm"}>
                    Sign Up
                  </Button>
                </SignUpButton>
                <SignInButton>
                  <Button size={"sm"}>
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              {!hasPro? 
                <Button asChild size="sm" variant = "tertiary" className="ml-auto mr-[10px]">
                  <Link href="/pricing">
                  <CrownIcon/> Upgrade
                  </Link>
                </Button>:
                ""
              }
              <UserControl showName={true}/> 
            </SignedIn>
          </>
        )}
      </div>
    </nav>
  )
}