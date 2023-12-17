/*
  Warnings:

  - You are about to drop the column `hearbeat` on the `waiter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "waiter" DROP COLUMN "hearbeat",
ADD COLUMN     "heartbeat" INTEGER;
