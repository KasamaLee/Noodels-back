/*
  Warnings:

  - The values [PENDING,COMPLETEED,FAILED] on the enum `Payment_type` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `status` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Payment` ADD COLUMN `status` ENUM('PENDING', 'COMPLETEED', 'FAILED') NOT NULL,
    MODIFY `type` ENUM('QR_CODE', 'CREDIT_CARD') NOT NULL;
