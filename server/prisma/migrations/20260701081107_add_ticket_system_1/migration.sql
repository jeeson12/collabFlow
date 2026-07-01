/*
  Warnings:

  - A unique constraint covering the columns `[workspaceId,projectKey]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ticketId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "projectKey" TEXT,
ADD COLUMN     "taskSequence" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "ticketId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Project_workspaceId_projectKey_key" ON "Project"("workspaceId", "projectKey");

-- CreateIndex
CREATE UNIQUE INDEX "Task_ticketId_key" ON "Task"("ticketId");
