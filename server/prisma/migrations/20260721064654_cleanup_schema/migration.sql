/*
  Warnings:

  - You are about to drop the `activity` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `projectKey` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `creatorId` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ticketId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "activity" DROP CONSTRAINT "activity_userId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "projectKey" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "creatorId" SET NOT NULL,
ALTER COLUMN "ticketId" SET NOT NULL;

-- DropTable
DROP TABLE "activity";

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "workspaceId" TEXT,
    "projectId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
