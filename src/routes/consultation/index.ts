import { AuthRequest } from '../../types/global'
import { Response } from 'express'
import { prisma } from '../../utils/prisma/client'

class ConsultationController {
  async creaateConsultation(req: AuthRequest, res: Response) {
    try {
      const { fullName, dagree, phone_number, telegram_user, youtube_url } = req.body
      const imageUrl: string = req.imageUrl as string

      const newConsultation = await prisma.consultation.create({
        data: {
          fullName,
          image: imageUrl,
          dagree,
          phone_number,
          telegram_user,
          youtube_url,
        },
      })
      return res.json({ success: true, data: newConsultation })
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error ' + (error as Error).message,
      })
    }
  }

  async getConsultation(req: AuthRequest, res: Response) {
    try {
      const getConsultation = await prisma.consultation.findMany()
      return res.json({ success: true, data: getConsultation })
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error ' + (error as Error).message,
      })
    }
  }

  async getConsultationById(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id)
      const singleConsultation = await prisma.consultation.findUnique({
        where: { id },
      })
      if (!singleConsultation) {
        return res.status(404).json({ success: false, error: 'Consultant not found' })
      }
      return res.json({ success: true, data: singleConsultation })
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error ' + (error as Error).message,
      })
    }
  }

  async updatePlantsCategory(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id)
      const imageUrl: string = req.imageUrl as string

      const updatedPlantsCategory = await prisma.consultation.update({
        where: { id },
        data: { ...req.body, image: imageUrl },
      })
      return res.json({
        success: true,
        data: updatedPlantsCategory,
        message: 'Plants category updated',
      })
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error ' + (error as Error).message,
      })
    }
  }

  async deleteConsultant(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id)
      await prisma.consultation.delete({
        where: { id },
      })
      return res.json({
        success: true,
        message: 'Consultation deleted successfully',
      })
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        error: 'Internal server error ' + (error as Error).message,
      })
    }
  }
}

export const consultationController = new ConsultationController()
