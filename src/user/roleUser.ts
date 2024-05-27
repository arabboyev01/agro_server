import { prisma } from "../prisma/client";
import { Router, Response } from "express";
import { AuthRequest } from "../types/global";
import { error, success } from "../global/error";
import { auth } from "../auth";
import isAdmin from "../auth/admin";

const userRole = Router();

userRole.get("/", auth, isAdmin, async (req: AuthRequest, res: Response) => {
    try {

        const user = await prisma.user.findMany({
            where: { role: "USER" }
        })

        if (!user) {
            return res.status(403).json({ ...error })
        }

        return res.status(200).json({ ...success, message: "user role", user })
    } catch (err) {
        return res.status(501).json({ ...error })
    }
})
export default userRole
