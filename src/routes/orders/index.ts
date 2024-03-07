import { AuthRequest } from "../../types/global"
import { Response, Router } from "express"
import { prisma } from "../../prisma/client"
import { auth } from "../../auth"
import { storageDisk } from "../../disk"

const ordersRouter = Router()

class ProductController {
    async createPlantsCategory(req: AuthRequest, res: Response) {
        try {
            if (!req.isAdmin) {
                return res.status(403).json({ success: false, message: "Unathorized" })
            }

            const { plantName, plantVariety, price, customerName, phone, productId } = req.body
            const imageUrl: string = req.imageUrl as string

            const newPlantsCategory = await prisma.order.create({
                data: {
                    plantName,
                    image: imageUrl,
                    plantVariety,
                    price,
                    customerName,
                    phone,
                    productId
                }
            })
            return res.json({ success: true, data: newPlantsCategory })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Unable to create plants category" })
        }
    }

    async getPlantsCategories(req: AuthRequest, res: Response) {
        try {
            const plantsCategories = await prisma.order.findMany()
            return res.json({ success: true, data: plantsCategories });
        } catch (error) {
            res.status(500).json({ error: "Unable to retrieve plants categories" })
        }
    }

    async getPlantsCategoryById(req: AuthRequest, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const plantsCategory = await prisma.order.findUnique({
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
    
            const { plantName, plantVariety, price, customerName, phone, productId } = req.body
            const imageUrl: string = req.imageUrl as string

            const updatedPlantsCategory = await prisma.order.create({
                data: {
                    plantName,
                    image: imageUrl,
                    plantVariety,
                    price,
                    customerName,
                    phone,
                    productId
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
            await prisma.order.delete({
                where: { id }
            });
            return res.json({ success: true, message: "Plants category deleted successfully" })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Unable to create plants category" })
        }
    }
}

const productController = new ProductController()

ordersRouter.post("/", auth, storageDisk, productController.createPlantsCategory)
ordersRouter.get("/", productController.getPlantsCategories)
ordersRouter.get("/:id", productController.getPlantsCategoryById)
ordersRouter.put("/:id", auth, storageDisk, productController.updatePlantsCategory)
ordersRouter.delete("/:id", productController.deletePlantsCategory)

export default ordersRouter