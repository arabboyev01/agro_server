import { AuthRequest } from "../../types/global"
import { Response, Router } from "express"
import { prisma } from "../../prisma/client"
import { auth } from "../../auth"
import { storageDisk } from "../../disk"
import { error } from "../../global/error"

const plantsProducts = Router()

class PlantProducts {
    async createPlantsCategory(req: AuthRequest, res: Response) {
        try {
            if (!req.isAdmin) {
                return res.status(403).json({ success: false, message: "Unathorized" })
            }

            const { name, plantsCategoryId, plantTypeId, waterPeriod, yieldDuration, temperature, lightRequirement, cultivationMethod } = req.body

            if (!name || !plantsCategoryId || !plantTypeId || !waterPeriod || !yieldDuration || !temperature || !lightRequirement || !cultivationMethod) {
                return res.status(400).json({ ...error })
            }
            const imageUrl: string = req.imageUrl as string

            const newPlant = await prisma.plant.create({
                data: {
                    name,
                    image: imageUrl,
                    plantTypeId,
                    plantsCategoryId,
                    waterPeriod,
                    yieldDuration,
                    temperature,
                    lightRequirement,
                    cultivationMethod
                }
            })
            return res.json({ success: true, data: newPlant })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Unable to create plants category" })
        }
    }

    async getPlantsCategories(req: AuthRequest, res: Response) {
        try {
            const plantsCategories = await prisma.plant.findMany()
            return res.json({ success: true, data: plantsCategories });
        } catch (error) {
            res.status(500).json({ error: "Unable to retrieve plants categories" })
        }
    }

    async getPlantsCategoryById(req: AuthRequest, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const plantsCategory = await prisma.plant.findUnique({
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
            const { name, plantsCategoryId, plantTypeId, waterPeriod, yieldDuration, temperature, lightRequirement, cultivationMethod } = req.body

            if (!name || !plantsCategoryId || !plantTypeId || !waterPeriod || !yieldDuration || !temperature || !lightRequirement || !cultivationMethod) {
                return res.status(400).json({ ...error })
            }
            const imageUrl: string = req.imageUrl as string

            const updatedPlantsCategory = await prisma.plant.update({
                where: { id },
                data: {
                    name,
                    image: imageUrl,
                    plantTypeId,
                    plantsCategoryId,
                    waterPeriod,
                    yieldDuration,
                    temperature,
                    lightRequirement,
                    cultivationMethod
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
            await prisma.plant.delete({
                where: { id }
            });
            return res.json({ success: true, message: "Plants category deleted successfully" })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Unable to create plants category" })
        }
    }
}

const plantProducts = new PlantProducts()

plantsProducts.post("/", auth, storageDisk, plantProducts.createPlantsCategory)
plantsProducts.get("/", plantProducts.getPlantsCategories)
plantsProducts.get("/:id", plantProducts.getPlantsCategoryById)
plantsProducts.put("/:id", auth, storageDisk, plantProducts.updatePlantsCategory)
plantsProducts.delete("/:id", plantProducts.deletePlantsCategory)

export default plantsProducts