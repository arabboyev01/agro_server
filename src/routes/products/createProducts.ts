import { Router, Response } from 'express'
import { prisma } from '../../prisma/client'
import { AuthRequest } from '../../types/global'
import { error, success } from '../../global/error'
import { storageDisk } from '../../disk'
import { auth } from '../../auth'

const createProduct = Router()

createProduct.post('/', auth, storageDisk, async (req: AuthRequest, res: Response) => {
    try {
        const { name, plantTypeId, plantsCategoryId, waterPeriod, yieldDuration, temperature, lightRequirement, cultivationMethod }
        = req.body

        const image: string = req.imageUrl as string

        if(!req.isAdmin){
            return res.status(403).json({ success: false, error: 'Unauthorized user' })
        }

        if (!name || !plantTypeId || !plantsCategoryId || !waterPeriod || !yieldDuration || !temperature || !lightRequirement || !cultivationMethod) {
            return res.status(400).json({ success: false, error: 'Missing required fields in the request body.' })
        }

        const products = await prisma.plant.create({
            data: {
                name,
                image,
                plantTypeId,
                plantsCategoryId,
                waterPeriod,
                yieldDuration,
                temperature,
                lightRequirement,
                cultivationMethod
            }
        })

        if (!products) {
            return res.status(401).json({ ...error })
        }

        return res.status(200).json({ ...success, data: products })
    } catch (err) {
        return res.status(500).json({ ...error })
    }
})
export default createProduct