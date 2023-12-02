-- DropForeignKey
ALTER TABLE "dishes" DROP CONSTRAINT "dishes_orderId_fkey";

-- AlterTable
ALTER TABLE "dishes" ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "dishes" ADD CONSTRAINT "dishes_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
