import { createUploadthing, type FileRouter } from "uploadthing/next";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      try {
        const self = await getSelf();
        return { user: self };
      } catch (error) {
        console.error("Middleware error:", error);
        throw new Error("Authentication failed");
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        const userId = metadata.user.id;

        // Check if userId and file.url are defined
        if (!userId || !file.url) {
          throw new Error("Missing user ID or file URL");
        }

        await db.stream.update({
          where: { userId },
          data: { thumbnailUrl: file.url },
        });

        return { fileUrl: file.url };
      } catch (error) {
        console.error("Upload complete error:", error);
        throw new Error("Failed to update database");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
