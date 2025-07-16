"use client"

import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs"
import { Skeleton } from "@/components/ui/skeleton"

export const ProjectsList = () => {
  const trpc = useTRPC()
  const { user, isLoaded } = useUser()
  const {data: projects, isLoading} = useQuery(trpc.projects.getMany.queryOptions())

  return (
    <div className="w-full bg-white dark:bg-sidebar rounded-xl p-8 border flex flex-col gap-y-6 sm:gap-y-4">
      <h2 className="text-2xl font-semibold">
        {!isLoaded ? (
          <Skeleton className="h-8 w-40" />
        ) : (
          <>{user?.firstName || "Saved"}{user?.firstName && "'s"} Vibes</>
        )}
      </h2>
      {isLoaded && !user?.firstName && (
        <div className="flex items-center gap-x-2">
          <SignInButton>
              Sign In
          </SignInButton>
          <p>or</p>
          <SignUpButton>
              Sign Up
          </SignUpButton>
          <p>to create vibes.</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({length: 3}).map((_, i) => (
            <div key={i} className="flex items-center gap-x-4 p-4 border rounded-xl bg-muted">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex flex-col flex-1 gap-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))
        ) : projects?.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No Vibes Found
            </p>
        ) : (
          projects?.map((p) => {
            return <Button
            key={p.id}
            variant={"outline"}
            asChild
            className="font-normal h-auto justify-start w-full text-start p-4"
            >
            <Link href={`/projects/${p.id}`} className="">
              <div className="flex items-center gap-x-4">
                <Image src={"/logo.svg"} alt="vibe" width={32} height={32} className="object-contain"/>
                <div className="flex flex-col">
                  <h3 className="truncate font-medium">
                    {p.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(p.updatedAt, {
                      addSuffix: true
                    })}
                  </p>
                </div>
              </div>
            </Link>
            </Button>
          })
        )}
      </div>
    </div>
  )
}