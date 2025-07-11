"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"

interface Props {
  children: React.ReactNode
  text: string
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

export const Hint = ({children, text, side, align }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}