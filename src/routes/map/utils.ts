import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../../types/global'
import { informationType } from '../../utils/token/type'

const prisma = new PrismaClient()

export async function utils(req: AuthRequest, information: informationType[]) {
  const regionPromises = information.map((info) =>
    prisma.region.findUnique({
      where: { id: info.regionId },
    })
  )

  const districtPromises = information.map((info) =>
    prisma.district.findUnique({
      where: { id: info.districtId },
    })
  )

  const regions = await Promise.all(regionPromises)
  const districts = await Promise.all(districtPromises)

  return information.map((info, index) => ({
    ...info,
    region: regions[index],
    district: districts[index],
  }))
}
