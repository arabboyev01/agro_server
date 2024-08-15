import { AuthRequest } from '../../types/global'
import { Response } from 'express'
import { prisma } from '../../utils/prisma/client'

class OrderController {
  async createOrders(req: AuthRequest, res: Response) {
    try {
      const { customerName, phone, productId } = req.body

      const orders = await prisma.order.create({
        data: {
          customerName,
          customerPhone: phone,
          productId: Number(productId),
        },
      })
      return res.json({ success: true, data: orders })
    } catch (err: unknown) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error ' + (err as Error).message,
      })
    }
  }

  async getOrders(req: AuthRequest, res: Response) {
    try {
      const orders = await prisma.order.findMany()

      if (!orders.length) {
        return res.json({ success: true, data: [] })
      }

      const ordersWithProducts = await Promise.all(
        orders.map(async (order) => {
          const product = await prisma.product.findUnique({
            where: { id: order.productId },
          })
          return {
            ...order,
            product: product,
          }
        })
      )

      return res.json({ success: true, data: ordersWithProducts })
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

      const getOrderById = await prisma.order.findUnique({
        where: { id },
      })

      if (!getOrderById) {
        return res.status(404).json({ success: false, error: 'Order not found' })
      }

      const product = await prisma.product.findUnique({
        where: { id: getOrderById.productId },
      })

      const orderWithProduct = {
        ...getOrderById,
        product: product,
      }

      return res.json({ success: true, data: orderWithProduct })
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
      const { customerName, phone, productId } = req.body

      const updateOrders = await prisma.order.update({
        where: { id },
        data: {
          customerName,
          customerPhone: phone,
          productId: Number(productId),
        },
      })
      return res.json({
        success: true,
        data: updateOrders,
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
      await prisma.order.delete({
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

export const orderController = new OrderController()
