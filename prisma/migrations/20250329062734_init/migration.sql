/*
  Warnings:

  - You are about to drop the column `userProfile` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the column `userProfile` on the `Commission` table. All the data in the column will be lost.
  - You are about to drop the column `mappedProfile` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `mapperProfile` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `nodeProfile` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `userProfile` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `userProfile` on the `Salary` table. All the data in the column will be lost.
  - You are about to drop the `ProfileMeta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileStatus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_userProfile_fkey";

-- DropForeignKey
ALTER TABLE "Commission" DROP CONSTRAINT "Commission_userId_userProfile_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_mappedId_mappedProfile_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_mappedId_mapperProfile_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_nodeId_nodeProfile_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_userProfile_fkey";

-- DropForeignKey
ALTER TABLE "ProfileMeta" DROP CONSTRAINT "ProfileMeta_userId_userProfile_fkey";

-- DropForeignKey
ALTER TABLE "ProfileStatus" DROP CONSTRAINT "ProfileStatus_userId_userProfile_fkey";

-- DropForeignKey
ALTER TABLE "Salary" DROP CONSTRAINT "Salary_userId_userProfile_fkey";

-- DropIndex
DROP INDEX "User_id_profile_key";

-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "userProfile";

-- AlterTable
ALTER TABLE "Commission" DROP COLUMN "userProfile";

-- AlterTable
ALTER TABLE "Node" DROP COLUMN "mappedProfile",
DROP COLUMN "mapperProfile",
DROP COLUMN "nodeProfile";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "userProfile";

-- AlterTable
ALTER TABLE "Salary" DROP COLUMN "userProfile";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProfileMeta";

-- DropTable
DROP TABLE "ProfileStatus";

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commission" ADD CONSTRAINT "Commission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_mapperId_fkey" FOREIGN KEY ("mapperId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_mappedId_fkey" FOREIGN KEY ("mappedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
