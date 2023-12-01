/*
  Warnings:

  - You are about to drop the column `dishId` on the `orders` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `dishes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_dishId_fkey";

-- AlterTable
ALTER TABLE "dishes" ADD COLUMN     "orderId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "dishId";

-- AddForeignKey
ALTER TABLE "dishes" ADD CONSTRAINT "dishes_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
