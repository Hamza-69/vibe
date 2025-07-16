import type { Metadata } from "next"
import { ProjectView } from "@/modules/projects/ui/views/project-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"

export async function generateMetadata({ params }: { params: { projectId: string } }): Promise<Metadata> {
  // Fetch project data (simulate server-side fetch)
  const queryClient = getQueryClient()
  const project = await queryClient.fetchQuery(trpc.projects.getOne.queryOptions({ id: params.projectId }))

  if (!project) {
    return {
      title: "Project Not Found | Vibe",
      description: "This project does not exist on Vibe.",
      robots: { index: false, follow: false }
    }
  }

  return {
    title: `${project.name} | Vibe Project`,
    description: `View details and progress for the project '${project.name}' on Vibe.`,
    openGraph: {
      title: `${project.name} | Vibe Project`,
      description: `View details and progress for the project '${project.name}' on Vibe.`,
      url: `https://vibable.vercel.app/projects/${params.projectId}`,
      siteName: "Vibe",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: "Vibe Logo",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: `https://vibable.vercel.app/projects/${params.projectId}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Vibe Project`,
      description: `View details and progress for the project '${project.name}' on Vibe.`,
      images: [
        {
          url: "/logo.png",
          alt: "Vibe Logo",
        },
      ],
    },
  }
}

export default async function Page({ params }: { params: { projectId: string } }) {
  const { projectId } = params

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.messages.getMany.queryOptions({
    projectId
  }))

  void queryClient.prefetchQuery(trpc.projects.getOne.queryOptions({
    id: projectId
  }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading...</p>}>
          <ProjectView projectId={projectId}/>
        </Suspense>
    </HydrationBoundary>
  )
}