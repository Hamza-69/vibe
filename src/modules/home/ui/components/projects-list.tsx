"use client"

import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { Button } from "@/components/ui/button"

export const ProjectsList = () => {
  const trpc = useTRPC()
  const {data: projects} = useQuery(trpc.projects.getMany.queryOptions())

  return (
    <div className="w-full bg-white dark:bg-sidebar rounded-xl p-8 border flex flex-col gap-y-6 sm:gap-y-4">
      <h2 className="text-2xl font-semibold">
        Saved Vibes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {projects?.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <p className="text-sm text-muted-foreground">
              No Vibes Found
            </p>
          </div>
        )}
        {
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
        }
      </div>
    </div>
  )
}