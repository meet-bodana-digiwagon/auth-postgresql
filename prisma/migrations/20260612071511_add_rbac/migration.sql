-- CreateEnum
CREATE TYPE "Role" AS ENUM ('customer', 'vendor', 'admin');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'customer';
