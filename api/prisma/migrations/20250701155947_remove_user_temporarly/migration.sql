/*
  Warnings:

  - You are about to drop the column `user_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_user_id_fkey";

-- DropIndex
DROP INDEX "comments_user_id_idx";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "user_id";

-- DropTable
DROP TABLE "tokens";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "Role";
