import { inngest } from "@/inngest/client"
import { prisma } from "@/lib/db"
import { baseProcedure, createTRPCRouter } from "@/trpc/init"
import z from "zod"
import {generateSlug} from "random-word-slugs"
import { TRPCError } from "@trpc/server"

export const projectsRouter = createTRPCRouter({
  getMany: baseProcedure
    .query(
      async () => {
        const projects = await prisma.project.findMany({
          orderBy: {
            updatedAt: "asc",
          }
        })

        return projects
      }
    ),
  getOne: baseProcedure
    .input(z.object({
      id: z.string().min(1, {message: "Id is required"})
    }))
    .query(
      async ({input}) => {
        const project = await prisma.project.findUnique({
          where: {
            id: input.id
          }
        })

        if (!project) {
          throw new TRPCError({code : "NOT_FOUND", message: "Project not found"})
        }

        return project
      }
    ),
  create: baseProcedure.input(
    z.object({
      value: z.string().min(1, {message: "Value is required"}).max(10000, {message: "Value is too long"})
    })
  )
  .mutation(async ({input}) =>{
    const newProject = await prisma.project.create({
      data: {
        name: generateSlug(2, {
          format: "kebab"
        }),
        messages: {
          create: {
            content: input.value,
            role:"USER",
            type: "RESULT",
          }
        }
      }
    })

    await inngest.send({
      name: "code-agent/run",
      data: {
        value : input.value,
        projectId: newProject.id
      }
    })
    
    return newProject
  })
})

//message.create