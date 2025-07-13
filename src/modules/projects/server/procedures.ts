import { inngest } from "@/inngest/client"
import { prisma } from "@/lib/db"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import z from "zod"
import {generateSlug} from "random-word-slugs"
import { TRPCError } from "@trpc/server"

export const projectsRouter = createTRPCRouter({
  getMany: protectedProcedure
    .query(
      async ({ctx}) => {
        const projects = await prisma.project.findMany({
          where: {
            userId: ctx.auth.userId
          },
          orderBy: {
            updatedAt: "asc",
          }
        })

        return projects
      }
    ),
  getOne: protectedProcedure
    .input(z.object({
      id: z.string().min(1, {message: "Id is required"})
    }))
    .query(
      async ({input, ctx}) => {
        const project = await prisma.project.findUnique({
          where: {
            id: input.id,
            userId: ctx.auth.userId
          }
        })

        if (!project) {
          throw new TRPCError({code : "NOT_FOUND", message: "Project not found"})
        }

        return project
      }
    ),
  create: protectedProcedure.input(
    z.object({
      value: z.string().min(1, {message: "Value is required"}).max(10000, {message: "Value is too long"})
    })
  )
  .mutation(async ({input, ctx }) =>{
    const newProject = await prisma.project.create({
      data: {
        userId: ctx.auth.userId,
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