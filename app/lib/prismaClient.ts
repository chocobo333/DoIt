import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
class GlobalPrisma {
  async findAll() {
    return await prisma.toDo.findMany();
  }
}

export const globalPrisma = new GlobalPrisma();
