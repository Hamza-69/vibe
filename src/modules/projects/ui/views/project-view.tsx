"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable"
import { MessagesContainer } from "../components/messages-container"
import { Suspense, useState } from "react"
import { Fragment } from "@/generated/prisma"
import { ProjectHeader } from "../components/project-header"
import { FragmentWeb } from "../components/fragment-web"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import { CodeIcon, CrownIcon, EyeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileExplorer } from "@/components/file-explorer"
import { UserControl, UserControlSkeleton } from "@/components/user-control"
import { useAuth } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { ErrorBoundary } from "react-error-boundary"
import { ProjectHeaderSkeleton } from "../components/project-header"
import { MessagesSkeleton } from "../components/message-loading"

interface Props {
  projectId: string
}

export const ProjectView = ({projectId}: Props) =>{
  
  const { has } = useAuth()
  const hasPro = has?.({plan: "pro"})
  const { isLoaded } = useUser()

  const [activeFragment, setActiveFragment] = useState<Fragment|null>(null)
  const [tabState, setTabState] = useState<"preview" | "code">("preview")

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0">
          <ErrorBoundary fallback={<p>Error loading project.</p>}>
              <Suspense fallback={<ProjectHeaderSkeleton />}>
                <ProjectHeader projectId={projectId}/>
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallback={<p>Error loading messages.</p>}>
              <Suspense fallback={<MessagesSkeleton />}>
                <MessagesContainer 
                  projectId = {projectId}
                  activeFragment={activeFragment}
                  setActiveFragment={setActiveFragment}
                />
              </Suspense>
            </ErrorBoundary>
        </ResizablePanel>
        <ResizableHandle className="z-50 hover:bg-primary transition-colors"/>
        <ResizablePanel
          defaultSize={65}
          minSize={50}
          className="flex flex-col min-h-0"
        >
          <Tabs className="h-full gap-y-0" defaultValue="preview" value={tabState} onValueChange={(value) => setTabState(value as "preview" | "code")}>
            <div className="w-full flex items-center  p-2 border-b gap-x-2">
              <TabsList className="h-8 p-0 border rounded-md">
                <TabsTrigger value="preview" className="rounded-md cursor-pointer">
                  <EyeIcon/> <span>Demo</span>
                </TabsTrigger><TabsTrigger value="code" className="rounded-md cursor-pointer">
                  <CodeIcon/> <span>Code</span>
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-x-2 cursor-pointer">
              {isLoaded && !hasPro ? 
                <Button asChild size="sm" variant = "tertiary">
                  <Link href="/pricing">
                  <CrownIcon/> Upgrade
                  </Link>
                </Button> :
                ""
              }
              {!isLoaded ? <UserControlSkeleton /> : <UserControl />}
              </div>
            </div>
            <TabsContent value="preview">
              {activeFragment && <FragmentWeb data={activeFragment}/>}
            </TabsContent>
            <TabsContent value="code" className="h-full min-h-0 flex flex-col">
              {activeFragment?.files && <FileExplorer files={activeFragment.files as { [path: string ]: string}}/>}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}