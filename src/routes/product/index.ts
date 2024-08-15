import { AuthRequest } from '../../types/global'
import { Response } from 'express'
import { prisma } from '../../utils/prisma/client'

class ProductController {
  async createPlantsCategory(req: AuthRequest, res: Response) {
    try {
      if (!req.isAdmin) {
        return res.status(403).json({ success: false, message: 'Unathorized' })
      }

      const { name_uz, name_ru, name_en, plantTypeId, price } = req.body
      const imageUrl: string = req.imageUrl as string

      const newPlantsCategory = await prisma.product.create({
        data: {
          name_uz,
          name_ru,
          name_en,
          image: imageUrl,
          plantTypeId: Number(plantTypeId),
          price: Number(price),
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
      const search: string = req.query.search as string
      const categoryId: string = req.query.categoryId as string
      let plantsCategories
      const allProducts = await prisma.product.findMany()
      if (search) {
        plantsCategories = allProducts.filter((item) => {
          return (
            item.name_uz.toLowerCase().includes(search.toLowerCase()) ||
            item.name_ru.toLowerCase().includes(search.toLowerCase()) ||
            item.name_en.toLowerCase().includes(search.toLowerCase())
          )
        })
      } else if (categoryId) {
        plantsCategories = await prisma.product.findMany({
          where: {
            plantTypeId: parseInt(categoryId),
          },
        })
      } else {
        plantsCategories = allProducts
      }
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
      const plantsCategory = await prisma.product.findUnique({
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

      if (req.body.plantTypeId) {
        req.body.plantTypeId = Number(req.body.plantTypeId)
      }

      if (req.body.price) {
        req.body.price = Number(req.body.price)
      }
      const updatedPlantsCategory = await prisma.product.update({
        where: { id },
        data: { ...req.body, image: imageUrl },
      })
      return res.json({
        success: true,
        data: updatedPlantsCategory,
        message: 'Product updated',
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
      await prisma.product.delete({
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

export const productController = new ProductController()
