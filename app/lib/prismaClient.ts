import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
class GlobalPrisma {
  async findAll() {
    return await prisma.toDo.findMany();
  }

  async create(body: string) {
    await prisma.toDo.create({
      data: {
        body: body,
        deadline: new Date(),
      },
    });
    return;
  }
}

export const globalPrisma = new GlobalPrisma();
