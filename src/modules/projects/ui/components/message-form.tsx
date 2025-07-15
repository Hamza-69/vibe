import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import TextareaAutosize from "react-textarea-autosize"
import { ArrowUpIcon, Loader2Icon } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { Button } from "@/components/ui/button"
import {Form, FormField} from "@/components/ui/form"
import { Usage } from "./usage"
import { useRouter } from "next/navigation"

interface Props {
  projectId: string
}

const formSchema = z.object({
  value: z.string().min(1, {message: "Value is required"}).max(10000, {message: "Value is too long"})
})

export const MessageForm = ({projectId}: Props) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    }
  })
  const queryClient = useQueryClient()

  const [isFocused, setIsFocused] = useState(false)

  const trpc = useTRPC()
  const createMessage = useMutation(trpc.messages.create.mutationOptions({
    onSuccess: () => {
      form.reset()
      queryClient.invalidateQueries(
        trpc.messages.getMany.queryOptions({projectId})
      )
      queryClient.invalidateQueries(
        trpc.usage.status.queryOptions()
      )
    },
    onError: (error) => {
      toast.error(error.message)

      if (error.data?.code === "TOO_MANY_REQUESTS") {
        router.push("/pricing")
      }

    }
  }))
  const isPending = createMessage.isPending
  const isDisabled = isPending || !form.formState.isValid
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createMessage.mutateAsync({
      value: values.value,
      projectId
    })
  }

  const {data: usage} = useQuery(trpc.usage.status.queryOptions())
  const showUsage = !!usage

  return (
    <Form {...form}>
      {showUsage && (
        <Usage
          points={usage?.remainingPoints as number}
          msBeforeNext={usage?.msBeforeNext as number}
        />
      )}
      <form onSubmit={form.handleSubmit(onSubmit)}
      className={cn(
        "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
        isFocused && "shadow-xs",
        showUsage && "rounded-t-none"
      )}
      >
        <FormField
        control={form.control}
        name="value"
        render={({field}) => (
          <TextareaAutosize
          disabled={isPending}
          {...field}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          minRows={2}
          maxRows={8}
          className="pt-4 resize-none border-none w-full outline-none bg-transparent"
          placeholder="What would you like to build?"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              e.preventDefault()
              form.handleSubmit(onSubmit)(e)
            }
          }}
          />
        )}
        />
        <div className="flex gap-xp2 items-end justify-between pt-2">
          <div className="text-[10px] text-muted-foreground font-mono">
            <kbd className="ml-auto  pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span>&#x2318;</span>Enter
            </kbd>
            &nbsp;to submit
          </div>
          <Button
          disabled={isDisabled}
          className={cn(
            "size-8 rounded-full",
            isDisabled && "bg-muted-foreground border"
          )}
          >
            {
              isPending ? 
              <Loader2Icon className="size-4 animate-spin"/>:
              <ArrowUpIcon/>
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}