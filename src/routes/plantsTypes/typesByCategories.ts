import { Router, Response } from "express"
import { AuthRequest } from "../../types/global"
import { error } from "../../global/error"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const TypesByCategories = Router()

TypesByCategories.get("/:categoryId", async (req: AuthRequest, res: Response) => {
    try {
        const categoryId = req.params.categoryId

        const types = await prisma.plantsType.findMany({
            where: {
                categoryId: Number(categoryId)
            }
        })

        return res.status(200).json({ success: true, data: types })

    } catch (err: unknown) {
        return res.status(500).json({ ...error, message: (err as Error).message })
    }
})
export default TypesByCategories