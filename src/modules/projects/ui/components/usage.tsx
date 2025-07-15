import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs"
import { formatDuration, intervalToDuration } from "date-fns"
import { CrownIcon } from "lucide-react"
import Link from "next/link"

interface Props {
  points: number
  msBeforeNext: number
}

export const Usage = ({points, msBeforeNext}: Props) => {
  const { has } = useAuth()
  const hasPro = has?.({plan: "pro"})

  return(
    <div className="rounted-t-xl bg-background border border-b-0 p-2.5">
      <div className="flex items-center gap-x-2">
        <div>
          <p className="text-sm">
            {points} {hasPro? "C":"Free C"}redits remaining
          </p>
          <p className="text-xs text-muted-foreground">
            Restes in{" "}
            {formatDuration(
              intervalToDuration({
                start: new Date(),
                end: new Date(Date.now() + msBeforeNext)
              }),
              {format:["months", "days", "hours"]}
            )}
          </p>
        </div>
        {!hasPro? <Button asChild size="sm" variant = "tertiary" className="ml-auto">
          <Link href="/pricing">
          <CrownIcon/> Upgrade
          </Link>
        </Button>:
        ""
       }
      </div>
    </div>
  )
}