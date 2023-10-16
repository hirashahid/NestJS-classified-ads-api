-- CreateTable
CREATE TABLE "api_key" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "app_info" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "api_key_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "api_key_token_key" ON "api_key"("token");
