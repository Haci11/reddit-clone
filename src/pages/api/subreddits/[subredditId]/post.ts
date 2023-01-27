import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const prisma = new PrismaClient();
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const schema = z.object({
    title: z.string(),
    body: z.string(),
    subredditId: z.string().ref("subredditId"),
  });
  if (!schema.safeParse(req.body).success) {
    return res.status(400).json({ message: "Invalid" });
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const body: z.infer<typeof schema> = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        ...(session?.user ? { authorId: session.user.id } : {}),
        ...body,
      },
    });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
