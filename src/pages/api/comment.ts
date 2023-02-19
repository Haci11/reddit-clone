import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const prisma = new PrismaClient();
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const schema = z.object({
    content: z.string(),
    postId: z.string(),
  });
  if (!schema.safeParse(req.body).success) {
    return res.status(400).json({ message: "Invalid" });
  }
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const body: z.infer<typeof schema> = req.body;
  const data = {
    userId: session?.user?.id || "",
    ...body,
  };

  if (session?.user) {
    data.userId = session.user.id;
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const comment = await prisma.comment.create({
      data,
    });

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
