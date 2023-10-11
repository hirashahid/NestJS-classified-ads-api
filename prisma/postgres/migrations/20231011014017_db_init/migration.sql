/*
  Warnings:

  - You are about to drop the column `appInfo` on the `Api_Key` table. All the data in the column will be lost.
  - Added the required column `app_info` to the `Api_Key` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VerificationType" AS ENUM ('PasswordReset', 'Registration');

-- AlterTable
ALTER TABLE "Api_Key" DROP COLUMN "appInfo",
ADD COLUMN     "app_info" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "VerificationType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_value_key" ON "Token"("value");
