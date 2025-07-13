import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { MessageCard } from "./message-card"
import { MessageForm } from "./message-form"
import { useEffect, useRef } from "react"
import { Fragment } from "@/generated/prisma"
import { MessageLoading } from "./message-loading"


interface Props {
  projectId: string
  activeFragment: Fragment | null
  setActiveFragment: (fragment: Fragment| null)  => void
}

export const MessagesContainer = ({projectId, activeFragment, setActiveFragment}: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const lastAssistantMessageIdRef = useRef<string | null>(null)

  const trpc = useTRPC()
  const {data: messages} = useSuspenseQuery(trpc.messages.getMany.queryOptions({
    projectId, 
  },
  {
    // TODO: temporary live message update
    refetchInterval: 5000,
  }
))

  useEffect(()=> {
    const lastAssistantMessage = messages.findLast(
      (message) => message.role === "ASSISTANT"
    )
    if (lastAssistantMessage?.fragment && lastAssistantMessage.id !== lastAssistantMessageIdRef.current) {
      setActiveFragment(lastAssistantMessage.fragment)
      lastAssistantMessageIdRef.current = lastAssistantMessage.id

    }
  }, [messages, setActiveFragment])

  useEffect(()=> {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [messages.length])
  const lastMessage = messages[messages.length -1]
  const lastMessageUser = lastMessage.role === "USER"

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="pt-2 pr-1">
          {messages.map((m) => (
            <MessageCard
              key={m.id}
              content={m.content}
              role={m.role}
              fragment={m.fragment}
              createdAt={m.createdAt}
              isActiveFragment= {activeFragment?.id === m.fragment?.id}
              onFragmentClick={()=>{setActiveFragment(m.fragment)}}
              type= {m.type}
            />
           ))
          }
          {lastMessageUser && <MessageLoading/>}
          <div ref={bottomRef}/>
        </div>
      </div>
      <div className="relative p-3 pt-1">
        <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-background pointer-events-none"/>
        <MessageForm projectId= {projectId}/>
      </div>
    </div>
  )
}