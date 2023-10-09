-- CreateTable
CREATE TABLE "Api_Key" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "appInfo" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Api_Key_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Api_Key_token_key" ON "Api_Key"("token");
