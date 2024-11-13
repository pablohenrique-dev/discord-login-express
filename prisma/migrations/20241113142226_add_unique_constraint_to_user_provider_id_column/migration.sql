/*
  Warnings:

  - A unique constraint covering the columns `[user_provider_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_user_provider_id_key" ON "user"("user_provider_id");
