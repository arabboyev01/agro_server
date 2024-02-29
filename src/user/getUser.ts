import { prisma } from "../prisma/client";
import { Router, Response } from "express";
import { AuthRequest } from "../types/global";
import { error, success } from "../global/error";

const getUser = Router();

getUser.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findMany()

    if (!user) {
      return res.status(403).json({ ...error })
    }

    return res.status(200).json({ ...success, message: "user data", user })
  } catch (err) {
    return res.status(501).json({ ...error })
  }
})
export default getUser
