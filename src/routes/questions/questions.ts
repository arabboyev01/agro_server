import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export const questionRoute = async (req: Request, res: Response) => {
    try {
        if (req.body.userId) {
            req.body.userId = Number(req.body.userId);
        }

        const question = await prisma.questions.create({
            data: { ...req.body }
        })

        if (!question) {
            return res.status(400).json({ success: false, message: "Something wrong happened" })
        }

        return res.status(201).json({ success: true, data: question })
    } catch (err: unknown) {
        return res.status(500).json({ success: false, message: (err as Error).message })
    }
} 

export const getAllQuestionRoute = async (req: Request, res: Response) => {
  try {
    const questions = await prisma.questions.findMany({
        include: {
            user: true
        }
    })

    return res.status(201).json({ success: true, data: questions })
  } catch (err: unknown) {
    return res.status(500).json({ success: false, message: (err as Error).message })
  }
}