import Image from "next/image"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

const ShimmerMessages = () => {
  const messages = [
    "Thinking...",
    "Loading...",
    "Generating...",
    "Analyzing your request...",
    "Building your website...",
    "Crafting components...",
    "Optimizing layout...",
    "Adding final touches...",
    "Almost ready..."
  ]

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => ((prev+1) % messages.length))
    }, 2000)

    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-muted-foreground animate-pulse">
        {messages[currentMessageIndex]}
      </span>
    </div>
  )
}

export const MessageLoading = () => {
  return (
    <div className="flex flex-col group px-2 pb-4">
      <div className="flex items-center gap-2 pl-2 mb-2">
        <Image
        src={"/logo.svg"}
        alt="Vibe"
        width={18}
        height={18}
        className="shrink-0"
        />
        <span className="text-sm font-medium">Vibe</span>
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4">
        <ShimmerMessages/>
      </div>
    </div>
  )
}

export const MessagesSkeleton = () => (
  <div className="flex flex-col gap-4 px-2 pb-4">
    {[1,2,3].map((i) => (
      <div key={i} className="flex items-center gap-2 pl-2 mb-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    ))}
  </div>
)