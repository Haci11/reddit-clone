import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { subredditId } = req.query;
  if (!subredditId || Array.isArray(subredditId)) {
    return res.status(404).json({ message: "gg kid" });
  }

  const posts = await prisma.subReddit.findUnique({
    where: {
      id: subredditId,
    },
    include: {
      posts: {
        include: {
          author: true,
        },
      },
    },
  });

  res.status(200).json(posts);
}
