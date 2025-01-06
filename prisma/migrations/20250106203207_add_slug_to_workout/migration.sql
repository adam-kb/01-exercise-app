/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "slug" TEXT NOT NULL DEFAULT 'default-slug';

-- CreateIndex
CREATE UNIQUE INDEX "Workout_slug_key" ON "Workout"("slug");
