import { PrismaClient  } from "@prisma/client"

interface IBooks {
  title: string
  description: string
  author: string
}

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody<IBooks>(event)

  const books = await prisma.books.create({
    data: {
      title: body.title,
      description: body.description,
      author: body.author,
    }
  })
  return books
})