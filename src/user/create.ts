import { prisma } from "../prisma/client";
import { Router, Response } from "express";
import { AuthRequest } from "../types/global";
import { error, success } from "../global/error";
import { hashingPassword } from "../hash";
import { generateToken } from "../token";

const createUser = Router();

createUser.post("/", async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const hashPassword = await hashingPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        role: "ADMIN",
      },
    });

    if (!user) {
      return res.status(403).json({ ...error });
    }

    const token = generateToken(user.id);

    return res
      .status(201)
      .json({ ...success, message: "user created", token, user });
  } catch (err) {
    return res.status(501).json({ ...error });
  }
});
export default createUser;
