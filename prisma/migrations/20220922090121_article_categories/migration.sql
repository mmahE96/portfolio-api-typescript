/*
  Warnings:

  - You are about to drop the column `category` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Article` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateUpdated` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "category",
DROP COLUMN "date",
ADD COLUMN     "categoryId" INTEGER,
ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateUpdated" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_title_key" ON "Article"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
