import { Router, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { AuthRequest } from "../../../types/global"
import { success, error } from "../../../global/error"
import { auth } from "../../../auth"

const distrcitsByRegionId = Router()
const prisma = new PrismaClient()

distrcitsByRegionId.get("/:regionId", auth, (req: AuthRequest, res: Response) => {
    try {
        const district = prisma.district.findMany({
            where: { regionId: Number(req.params.regionId) }
        })

        return res.status(200).json({ ...success, data: district })
    } catch (err: unknown) {
        return res.status(500).json({ ...error, message: (err as Error).message })
    }
})
export default distrcitsByRegionId