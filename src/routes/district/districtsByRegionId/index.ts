import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../../../types/global'
import { success, error } from '../../../utils/global/error'

const prisma = new PrismaClient()

export const getDistrictByRegionId = async (req: AuthRequest, res: Response) => {
  try {
    const district = await prisma.district.findMany({
      where: { regionId: Number(req.params.regionId) },
    })

    return res.status(200).json({ ...success, data: district })
  } catch (err: unknown) {
    return res.status(500).json({ ...error, message: (err as Error).message })
  }
}
