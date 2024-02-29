import { Router, Response } from "express"
import { prisma } from "../../prisma/client"
import { AuthRequest } from "../../types/global"
import { error, success } from "../../global/error"

const getProducts = Router()

getProducts.get('/', (req: AuthRequest, res: Response) => {
    try {
        const products = prisma.plant.findMany()

        return res.status(200).json({ ...success, message: "Plant products", data: products })
    } catch (err) {
        return res.status(500).json({ ...error })
    }
})
export default getProducts