"use client"

import { useCurrentTheme } from "@/hooks/use-current-theme"
import { PricingTable, useUser } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import Image from "next/image"
import { useEffect } from "react"

const Page = () => {
  const currentTheme = useCurrentTheme()
  const { user } = useUser() 


  // make it so for free tier the text is get started
  useEffect(() => {
    if (!user) {
      setInterval(() => {
        const firstButton = document.querySelector('.cl-pricingTableCardFooterButton')

        if (firstButton?.textContent?.toLowerCase().includes('subscribe')) {
          firstButton.textContent = 'Get Started'
          
        }
      }, 100)
    }
  }, [user])

  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 pt-[16vh] 2xl:pt-48">
        <div className=" flex flex-col items-center">
          <Image
            className = "hidden md:block"
            width={50}
            height={50}
            src="/logo.svg"
            alt="Vibe"
          />
        </div>
        <h1 className="text-xl md:text-3xl font-bold text-center">Pricing</h1>
        <p className="text-muted-foreground text-center text-sm md:text-base">Choose the plan that fits your needs</p>
        <PricingTable
          appearance={{
            baseTheme: currentTheme === "dark" ? dark : undefined,
            elements: {
              pricingTableCard: "border! shadow-none! rounded-lg!",
            },
          }}
        />
      </section>
    </div>
  )
}

export default Page