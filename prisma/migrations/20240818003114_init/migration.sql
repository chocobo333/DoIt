/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Card";

-- CreateTable
CREATE TABLE "ToDo" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToDo_pkey" PRIMARY KEY ("id")
);
