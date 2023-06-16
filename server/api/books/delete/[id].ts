import { PrismaClient  } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  const books = await prisma.books.delete({
    where: { id }
  })
  return books
})