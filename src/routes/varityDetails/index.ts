import { Router, Response } from "express"
import { AuthRequest } from "../../types/global"
import { error } from "../../global/error"
import { PrismaClient } from "@prisma/client"

const varityDetails = Router()
const prisma = new PrismaClient()

varityDetails.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const type: string = req.query.type as string;
    const category: string = req.query.category as string;
    if (!type || !category)
      return res
        .status(400)
        .json({ success: false, message: "please provide quereis correctly!" })

    const plants = await prisma.plant.findMany({
      where: {
        plantTypeId: {
          equals: parseInt(type),
        },
        plantsCategoryId: {
          equals: parseInt(category),
        },
      },
    })

    return res.json({ success: true, data: plants })
  } catch (err: unknown) {
    return res.status(500).json({ ...error })
  }
})
export default varityDetails
