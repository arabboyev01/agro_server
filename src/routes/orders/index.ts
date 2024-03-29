import { AuthRequest } from "../../types/global"
import { Response, Router } from "express"
import { prisma } from "../../prisma/client"
import { auth } from "../../auth"
import { storageDisk } from "../../disk"

const ordersRouter = Router()

class OrderController {
    async createPlantsCategory(req: AuthRequest, res: Response) {
        try {
            const { plantName, plantVariety, price, customerName, phone, productId, image } = req.body

            const newPlantsCategory = await prisma.order.create({
                data: {
                    plantName,
                    image,
                    plantVariety,
                    price: Number(price),
                    customerName,
                    phone,
                    productId: Number(productId)
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
            const { plantName, plantVariety, price, customerName, phone, productId, image } = req.body

            const updatedPlantsCategory = await prisma.order.update({
                where: { id },
                data: {
                    plantName,
                    image,
                    plantVariety,
                    price: Number(price),
                    customerName,
                    phone,
                    productId: Number(productId)
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

const orderController = new OrderController()

ordersRouter.post("/", orderController.createPlantsCategory)
ordersRouter.get("/", orderController.getPlantsCategories)
ordersRouter.get("/:id", orderController.getPlantsCategoryById)
ordersRouter.put("/:id", auth, storageDisk, orderController.updatePlantsCategory)
ordersRouter.delete("/:id", orderController.deletePlantsCategory)

export default ordersRouter