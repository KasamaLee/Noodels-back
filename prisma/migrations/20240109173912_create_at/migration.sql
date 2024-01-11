/*
  Warnings:

  - You are about to drop the column `updateAt` on the `Cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Cart` DROP COLUMN `updateAt`,
    ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
