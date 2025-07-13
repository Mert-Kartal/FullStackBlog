-- DropForeignKey
ALTER TABLE "post_tags" DROP CONSTRAINT "post_tags_tagId_fkey";

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
