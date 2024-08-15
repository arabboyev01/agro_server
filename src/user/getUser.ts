import { prisma } from "../utils/prisma/client";
import { Router, Response } from "express";
import { AuthRequest } from "../types/global";
import { error, success } from "../utils/global/error";
import { auth } from "../auth";

const getUser = Router();

const users = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findMany();

    return res.status(200).json({ ...success, message: "user data", user });
  } catch (err) {
    return res.status(501).json({ ...error });
  }
};

const user = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
    });

    if (!user) {
      return res.status(403).json({ ...error });
    }

    return res.status(200).json({ ...success, message: "user data", user });
  } catch (err) {
    return res.status(501).json({ ...error });
  }
};

getUser.get("/all", auth, users);
getUser.get("/", auth, user);

export default getUser;
