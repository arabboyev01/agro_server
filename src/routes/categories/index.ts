import { Router, Response } from "express"
import { prisma } from "../../prisma/client"
import { error } from "../../global/error"
import { AuthRequest } from "../../types/global"

const createCategory = Router()

createCategory.post('/', (req: AuthRequest, res: Response) => {
    try {
        const { name, image, plantType } = req.body
    } catch (err) {
        res.status(500).json({ ...error })
    }
})
