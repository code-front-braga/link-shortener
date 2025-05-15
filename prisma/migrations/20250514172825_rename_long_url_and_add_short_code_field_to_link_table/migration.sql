/*
  Warnings:

  - You are about to drop the column `url` on the `Link` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shortCode]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `longUrl` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortCode` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "url",
ADD COLUMN     "longUrl" TEXT NOT NULL,
ADD COLUMN     "shortCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Link_shortCode_key" ON "Link"("shortCode");
