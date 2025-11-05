-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "guests" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "table" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'confirmed',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);
