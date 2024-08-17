-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
