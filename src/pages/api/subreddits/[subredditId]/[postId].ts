import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postId } = req.query;
  if (!postId || Array.isArray(postId)) {
    return res.status(404).json({ message: "gg kid" });
  }
  const posts = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      subreddit: true,
      author: true,
      Comment: true,
    },
  });
  res.status(200).json(posts);
}
