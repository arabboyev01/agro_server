import { prisma } from "../prisma/client";
import { Router, Response } from "express";
import { AuthRequest } from "../types/global";
import { error, success } from "../global/error";
import { auth } from "../auth";

const getUser = Router();

getUser.get("/", auth, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.id) }
    })

    if (!user) {
      return res.status(403).json({ ...error })
    }

    return res.status(200).json({ ...success, message: "user data", user })
  } catch (err) {
    return res.status(501).json({ ...error })
  }
})
export default getUser
