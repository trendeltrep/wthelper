/*
  Warnings:

  - Added the required column `role` to the `waiter` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WaiterRole" AS ENUM ('ADMIN', 'WAITER');

-- AlterTable
ALTER TABLE "waiter" ADD COLUMN     "role" "WaiterRole" NOT NULL;

-- DropEnum
DROP TYPE "WaiterStatus";
