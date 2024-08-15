import { AuthRequest } from '../../types/global'
import { Response } from 'express'
import { prisma } from '../../utils/prisma/client'

class PlantsCategoryController {
  async createPlantsCategory(req: AuthRequest, res: Response) {
    try {
      if (!req.isAdmin) {
        return res.status(403).json({ success: false, message: 'Unathorized' })
      }

      const { name_uz, name_ru, name_en } = req.body
      const imageUrl: string = req.imageUrl as string

      const newPlantsCategory = await prisma.plantsCategory.create({
        data: {
          name_uz,
          name_ru,
          name_en,
          image: imageUrl,
        },
      })
      return res.json({ success: true, data: newPlantsCategory })
    } catch (err: unknown) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error ' + (err as Error).message,
      })
    }
  }

  async getPlantsCategories(req: AuthRequest, res: Response) {
    try {
      const plantsCategories = await prisma.plantsCategory.findMany({
        include: {
          plantTypes: true,
          Plant: true,
        },
      })
      return res.json({ success: true, data: plantsCategories })
    } catch (err: unknown) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error ' + (err as Error).message,
      })
    }
  }

  async getPlantsCategoryById(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id)
      const plantsCategory = await prisma.plantsCategory.findUnique({
        where: { id },
      })
      if (!plantsCategory) {
        return res.status(404).json({ success: false, error: 'Plants category not found' })
      }
      return res.json({ success: true, data: plantsCategory })
    } catch (err: unknown) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error ' + (err as Error).message,
      })
    }
  }

  async updatePlantsCategory(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id)

      if (!req.isAdmin) {
        return res.status(403).json({ success: false, message: 'Unathorized' })
      }
      const imageUrl: string = req.imageUrl as string

      const updatedPlantsCategory = await prisma.plantsCategory.update({
        where: { id },
        data: { ...req.body, image: imageUrl },
      })
      return res.json({
        success: true,
        data: updatedPlantsCategory,
        message: 'Plants category updated',
      })
    } catch (err: unknown) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error ' + (err as Error).message,
      })
    }
  }

  async deletePlantsCategory(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id)
      await prisma.plantsCategory.delete({
        where: { id },
      })
      return res.json({
        success: true,
        message: 'Plants category deleted successfully',
      })
    } catch (err: unknown) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error ' + (err as Error).message,
      })
    }
  }
}

export const plantsCategoryController = new PlantsCategoryController()
