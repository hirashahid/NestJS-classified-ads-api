/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Api_Key` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Api_Key" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);
