import { AuthRequest } from '../../types/global'
import { Response } from 'express'
import { prisma } from '../../utils/prisma/client'

class RegionsClass {
  async createRegion(req: AuthRequest, res: Response) {
    try {
      if (!req.isAdmin) {
        return res.status(403).json({ success: false, message: 'Unathorized' })
      }

      const region = await prisma.region.create({
        data: { ...req.body },
      })
      return res.json({ success: true, data: region })
    } catch (err: unknown) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error ' + (err as Error).message,
      })
    }
  }

  async getRegions(req: AuthRequest, res: Response) {
    try {
      const regions = await prisma.region.findMany()

      return res.json({ success: true, data: regions })
    } catch (err: unknown) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error ' + (err as Error).message,
      })
    }
  }

  async getRegionById(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id)
      const region = await prisma.region.findUnique({
        where: { id },
      })
      if (!region) {
        return res.status(404).json({ success: false, error: 'Region not found' })
      }
      return res.json({ success: true, data: region })
    } catch (err: unknown) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error ' + (err as Error).message,
      })
    }
  }

  async updateRegion(req: AuthRequest, res: Response) {
    try {
      if (!req.isAdmin) {
        return res.status(403).json({ success: false, message: 'Unathorized' })
      }

      const region = await prisma.region.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      })
      return res.json({ success: true, data: region })
    } catch (err: unknown) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error ' + (err as Error).message,
      })
    }
  }

  async deleteRegion(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id)
      await prisma.region.delete({
        where: { id },
      })
      return res.json({
        success: true,
        message: 'Region deleted successfully',
      })
    } catch (err: unknown) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error ' + (err as Error).message,
      })
    }
  }
}
export const regionsClass = new RegionsClass()
