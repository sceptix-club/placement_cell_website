/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `branch` on the `student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('STUDENT', 'MENTOR', 'MANAGER');

-- CreateEnum
CREATE TYPE "branch" AS ENUM ('Computer_Science_Engineering', 'Electronics_and_Communication_Engineering', 'Electrical_and_Electronics_Engineering', 'Mechanical_Engineering', 'Civil_Engineering', 'Artificial_Intelligence_and_Machine_Learning', 'CSE_Data_Science', 'Computer_Science_and_Business_Systems');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "role" NOT NULL DEFAULT 'STUDENT';

-- AlterTable
ALTER TABLE "student" DROP COLUMN "branch",
ADD COLUMN     "branch" "branch" NOT NULL;

-- DropEnum
DROP TYPE "Role";
