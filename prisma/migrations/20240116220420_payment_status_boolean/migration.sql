/*
  Warnings:

  - You are about to alter the column `status` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Payment` MODIFY `status` BOOLEAN NOT NULL;
