import { AuthRequest } from "../../types/global"
import { Response, Router } from "express"
import { prisma } from "../../prisma/client"
import { auth } from "../../auth"
import { storageDisk } from "../../disk"

const consultationRouter = Router()

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
                    youtube_url
                }
            })
            return res.json({ success: true, data: newConsultation })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Unable to create consultation" })
        }
    }

    async getConsultation(req: AuthRequest, res: Response) {
        try {
            const getConsultation = await prisma.consultation.findMany()
            return res.json({ success: true, data: getConsultation })
        } catch (error) {
            res.status(500).json({ error: "Unable to retrive consultation" })
        }
    }

    async getConsultationById(req: AuthRequest, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const singleConsultation = await prisma.consultation.findUnique({
                where: { id }
            });
            if (!singleConsultation) {
                return res.status(404).json({ success: false, error: "Consultant not found" })
            }
            return res.json({ success: true, data: singleConsultation })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Unable to create plants category" })
        }
    }

    async updatePlantsCategory(req: AuthRequest, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const { fullName, dagree, phone_number, telegram_user, youtube_url } = req.body
            const imageUrl: string = req.imageUrl as string

            const updatedPlantsCategory = await prisma.consultation.update({
                where: { id },
                data: {
                    fullName,
                    image: imageUrl,
                    dagree,
                    phone_number,
                    telegram_user,
                    youtube_url
                }
            })
            return res.json({ success: true, data: updatedPlantsCategory, message: "Plants category updated" })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Unable to create plants category" })
        }
    }

    async deleteConsultant(req: AuthRequest, res: Response) {
        try {
            const id = parseInt(req.params.id)
            await prisma.consultation.delete({
                where: { id }
            });
            return res.json({ success: true, message: "Consultation deleted successfully" })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Unable to create plants category" })
        }
    }
}

const consultationController = new ConsultationController()

consultationRouter.post("/", auth, storageDisk, consultationController.creaateConsultation)
consultationRouter.get("/", consultationController.getConsultation)
consultationRouter.get("/:id", consultationController.getConsultationById)
consultationRouter.put("/:id", auth, storageDisk, consultationController.updatePlantsCategory)
consultationRouter.delete("/:id", consultationController.deleteConsultant)

export default consultationRouter