import { AuthRequest } from '../../types/global'
import { Response } from 'express'
import { prisma } from '../../utils/prisma/client'

class DistrictRouter {
  async createDistrict(req: AuthRequest, res: Response) {
    try {
      if (!req.isAdmin) {
        return res.status(403).json({ success: false, message: 'Unathorized' })
      }

      const district = await prisma.district.create({
        data: { ...req.body },
      })
      return res.json({ success: true, data: district })
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error ' + (error as Error).message,
      })
    }
  }

  async getDistricts(req: AuthRequest, res: Response) {
    try {
      const districts = await prisma.district.findMany()

      return res.json({ success: true, data: districts })
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error ' + (error as Error).message,
      })
    }
  }

  async getDistrictByCategory(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id)
      const destrict = await prisma.district.findUnique({
        where: { id },
      })
      if (!destrict) {
        return res.status(404).json({ success: false, error: 'destrict not found' })
      }
      return res.json({ success: true, data: destrict })
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error ' + (error as Error).message,
      })
    }
  }

  async updateDistrict(req: AuthRequest, res: Response) {
    try {
      if (!req.isAdmin) {
        return res.status(403).json({ success: false, message: 'Unathorized' })
      }

      if (req.body.regionId) {
        req.body.regionId = Number(req.body.regionId)
      }
      const district = await prisma.district.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      })
      return res.json({ success: true, data: district })
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error ' + (error as Error).message,
      })
    }
  }

  async deleteDistricts(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id)
      await prisma.district.delete({
        where: { id },
      })
      return res.json({
        success: true,
        message: 'Region deleted successfully',
      })
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error ' + (error as Error).message,
      })
    }
  }
}

export const districts = new DistrictRouter()
