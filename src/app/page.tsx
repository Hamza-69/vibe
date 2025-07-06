"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const Page =  () => {
  const trpc = useTRPC();
  const [value, setValue] = useState('')
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () =>{
      toast.success("Background job started")
    }
  }))
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Input value={value} onChange={(e) => setValue(e.target.value)}/>
      <Button disabled={invoke.isPending} onClick={() => invoke.mutate({value})}>
        Invoke Background Job
      </Button>
    </div>
  )
}

export default Page