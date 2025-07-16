import { useCurrentTheme } from "@/hooks/use-current-theme"
import { UserButton } from "@clerk/nextjs"
import {dark} from "@clerk/themes"
import { Skeleton } from "@/components/ui/skeleton"

interface Props {
  showName?: boolean
}

export const UserControl = ({showName}: Props) => {
  const currentTheme = useCurrentTheme()

  return (
    <UserButton
      showName={showName}
      appearance={{
        elements: {
          userButtonBox: "rounded-md!",
          userButtonAvatarBox: "rounded-md! size-8!",
          userButtonTrigger: "rounded-md!"
        },
        baseTheme: currentTheme==="dark" ? dark: undefined
      }}
    />
  )
}

export const UserControlSkeleton = ({showName}: {showName?: boolean}) => (
  <div className="flex items-center gap-2">
    {showName && <Skeleton className="h-4 w-20" />}
    <Skeleton className="h-8 w-8 rounded-full" />
  </div>
)