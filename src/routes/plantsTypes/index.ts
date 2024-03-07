import { AuthRequest } from "../../types/global"
import { Response, Router } from "express"
import { prisma } from "../../prisma/client"
import { auth } from "../../auth"
import { storageDisk } from "../../disk"

const plantsTypeRouter = Router()

class PlantsTypeController {
    async createPlantsCategory(req: AuthRequest, res: Response) {
        try {
            if (!req.isAdmin) {
                return res.status(403).json({ success: false, message: "Unathorized" })
            }

            const { name, categoryId } = req.body
            const imageUrl: string = req.imageUrl as string

            const newPlantsCategory = await prisma.plantsType.create({
                data: {
                    name,
                    image: imageUrl,
                    categoryId
                }
            })
            return res.json({ success: true, data: newPlantsCategory })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Unable to create plants category" })
        }
    }

    async getPlantsCategories(req: AuthRequest, res: Response) {
        try {
            const plantsCategories = await prisma.plantsType.findMany()
            return res.json({ success: true, data: plantsCategories });
        } catch (error) {
            res.status(500).json({ error: "Unable to retrieve plants categories" })
        }
    }

    async getPlantsCategoryById(req: AuthRequest, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const plantsCategory = await prisma.plantsCategory.findUnique({
                where: { id }
            });
            if (!plantsCategory) {
                return res.status(404).json({ success: false, error: "Plants category not found" })
            }
            return res.json({ success: true, data: plantsCategory })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Unable to create plants category" })
        }
    }

    async updatePlantsCategory(req: AuthRequest, res: Response) {
        try {
            const id = parseInt(req.params.id)

            if (!req.isAdmin) {
                return res.status(403).json({ success: false, message: "Unathorized" })
            }
            const { name, categoryId } = req.body
            const imageUrl: string = req.imageUrl as string

            const updatedPlantsCategory = await prisma.plantsType.update({
                where: { id },
                data: {
                    name,
                    image: imageUrl,
                    categoryId
                }
            })
            return res.json({ success: true, data: updatedPlantsCategory, message: "Plants category updated" })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Unable to create plants category" })
        }
    }

    async deletePlantsCategory(req: AuthRequest, res: Response) {
        try {
            const id = parseInt(req.params.id)
            await prisma.plantsType.delete({
                where: { id }
            });
            return res.json({ success: true, message: "Plants category deleted successfully" })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Unable to create plants category" })
        }
    }
}

const plantsTypeController = new PlantsTypeController()

plantsTypeRouter.post("/", auth, storageDisk, plantsTypeController.createPlantsCategory)
plantsTypeRouter.get("/", plantsTypeController.getPlantsCategories)
plantsTypeRouter.get("/:id", plantsTypeController.getPlantsCategoryById)
plantsTypeRouter.put("/:id", auth, storageDisk, plantsTypeController.updatePlantsCategory)
plantsTypeRouter.delete("/:id", plantsTypeController.deletePlantsCategory)

export default plantsTypeRouter