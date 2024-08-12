import { prisma } from "../prisma/client"
import { Router, Response } from "express"
import { AuthRequest } from "../types/global"
import { error, success } from "../global/error"
import { comparePassword } from "../hash"
import { generateToken } from "../token"

const login = Router()

login.post("/", async (req: AuthRequest, res: Response) => {
    try {
        const { email, password } = req.body

        const user: any = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return res.status(403).json({ ...error, message: "incorrect email" })
        }

        const hashPassword = await comparePassword(password, user.password)

        if (!hashPassword) {
            return res.status(403).json({ ...error, message: "incorrect password" })
        }

        const token = generateToken(user.id)

        return res
            .status(200)
            .json({ ...success, message: "Logged in", token, role: user.role })
    } catch (err) {
        return res.status(501).json({ ...error });
    }
})
export default login
