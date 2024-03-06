import { AuthRequest } from "../../types/global"
import { Response, Router } from "express"
import { prisma } from "../../prisma/client"
import { auth } from "../../auth"
import { storageDisk } from "../../disk"

const plantsCategoryRouter = Router()

class PlantsCategoryController {
    async createPlantsCategory(req: AuthRequest, res: Response) {
        try {
            if (!req.isAdmin) {
                return res.status(403).json({ success: false, message: "Unathorized" })
            }

            const { name, plantType } = req.body
            const imageUrl: string = req.imageUrl as string

            const newPlantsCategory = await prisma.plantsCategory.create({
                data: {
                    name,
                    image: imageUrl,
                    plantType
                }
            })
            return res.json({ success: true, data: newPlantsCategory })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Unable to create plants category" })
        }
    }

    async getPlantsCategories(req: AuthRequest, res: Response) {
        try {
            const plantsCategories = await prisma.plantsCategory.findMany({
                include: {
                    plantTypes: true,
                    Plant: true
                }
            })
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
            const { name, plantType } = req.body
            const imageUrl: string = req.imageUrl as string

            const updatedPlantsCategory = await prisma.plantsCategory.update({
                where: { id },
                data: {
                    name,
                    image: imageUrl,
                    plantType
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
            await prisma.plantsCategory.delete({
                where: { id }
            });
            return res.json({ success: true, message: "Plants category deleted successfully" })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Unable to create plants category" })
        }
    }
}

const plantsCategoryController = new PlantsCategoryController()

plantsCategoryRouter.post("/", auth, storageDisk, plantsCategoryController.createPlantsCategory)
plantsCategoryRouter.get("/", plantsCategoryController.getPlantsCategories)
plantsCategoryRouter.get("/:id", plantsCategoryController.getPlantsCategoryById)
plantsCategoryRouter.put("/:id",  auth, storageDisk, plantsCategoryController.updatePlantsCategory)
plantsCategoryRouter.delete("/:id", plantsCategoryController.deletePlantsCategory)

export default plantsCategoryRouter