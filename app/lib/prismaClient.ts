import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
class GlobalPrisma {
  async findAll() {
    return await prisma.todo.findMany();
  }

  async create(body: string) {
    await prisma.todo.create({
      data: {
        body: body,
        deadline: new Date(),
      },
    });
    return;
  }

  async delete(id: number) {
    await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    return;
  }
}

export const globalPrisma = new GlobalPrisma();
