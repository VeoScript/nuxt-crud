import { PrismaClient  } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const books = await prisma.books.findMany()
  return books
})