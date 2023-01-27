// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const subredditWithPostCounts = await prisma.subReddit.findMany({
      include: {
        posts: true,
      },
    });

    res.status(200).json(subredditWithPostCounts);
  } else if (req.method === "POST") {
    const schema = z.object({ title: z.string() });
    if (!schema.safeParse(req.body).success) {
      return res.status(400).json({ message: "Invalid" });
    }
    const body: z.infer<typeof schema> = req.body;
    const subreddit = await prisma.subReddit.create({ data: body });
    res.json(subreddit);
  }
}
