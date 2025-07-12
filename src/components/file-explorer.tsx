import { CopyCheckIcon, CopyIcon } from "lucide-react"
import { useState, useMemo, useCallback, Fragment } from "react"
import { Hint } from "./hints"
import { Button } from "./ui/button"
import { CodeView } from "./code-view"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbPage, BreadcrumbList } from "./ui/breadcrumb"
import { convertFilestToTreeItems } from "@/lib/utils"
import { TreeView } from "./tree-view"

type FileCollection = { [path: string ]: string}

function getLanguageFromExtension(filename:string): string {
  const extension = filename.split(".").pop()?.toLowerCase()
  return extension || "text"
}

interface FileBreadcrumbProps {
  filePath: string
}

const FileBreadcrumb = ({filePath}: FileBreadcrumbProps) => {
  const pathSegments = filePath.split("/")
  const maxSegments = 3

  const renderBreadCrumbItems = () =>{
    if (pathSegments.length <= maxSegments){
      return pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length -1

        return (
          <Fragment key={index}>
            <BreadcrumbItem>
              {isLast? (
                <BreadcrumbPage  className="font-medium">
                  {segment}
                </BreadcrumbPage>
              ):
                <span className="text-muted-foreground">
                  {segment}
                </span>
              } 
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator/>}
          </Fragment>
        )
      })
    } else {
      const firstSegment = pathSegments[0]
      const lastSegment = pathSegments[pathSegments.length -1]

      return (
        <>
          <BreadcrumbItem>
            <span className="text-muted-foreground">
              {firstSegment}
            </span>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis/>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">
                {lastSegment}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbItem>
        </>
      )
    }
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {renderBreadCrumbItems()}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

interface FileExplorerProps {
  files: FileCollection
}

export const FileExplorer = ({files}: FileExplorerProps) => {
  const [copied, setCopied] = useState(false)
  const [selectedFile, setSelectedFile] = useState<string| null>(() => {
    const filekeys = Object.keys(files)
    return filekeys.length > 0 ? filekeys[0]: null
  })

  const treeData = useMemo(()=>{
    return convertFilestToTreeItems(files)
  }, [files])

  const handleFileSelect = useCallback((filePath: string) => {
    if (files[filePath]) {
      setSelectedFile(filePath)
    }
  }, [files])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(files[selectedFile as string])
    setCopied(true)
    setTimeout(()=> setCopied(false), 5000)
  }, [selectedFile, files])

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full min-h-0 flex">
      <ResizablePanel defaultSize={30} minSize={30} className="bg-sidebar">
       <TreeView 
        data={treeData}
        value={selectedFile}
        onSelect={handleFileSelect}
       />
      </ResizablePanel>
      <ResizableHandle className="hover:bg-primary transition-colors"/>
      <ResizablePanel defaultSize={70} minSize={50}>
        {selectedFile && files[selectedFile] ? (
          <div className="h-full w-full flex flex-col">
            <div className="border-b bg-sidebar px-4 py-4 flex justify-between items-center gap-x-2">
              <FileBreadcrumb filePath={selectedFile} />
              <Hint text="Copy to clipboard" side="bottom">
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto"
                  onClick={handleCopy}
                  disabled={copied}
                >
                  {copied? <CopyCheckIcon/> : <CopyIcon/>}
                </Button>
              </Hint>
            </div>
            <div className="flex-1 overflow-auto">
              <CodeView 
                code={files[selectedFile]}
                lang={getLanguageFromExtension(selectedFile)}
              />
            </div>
          </div>
        ):
        (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Select a file to view it&apos;s content
          </div>
        )
        }
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}