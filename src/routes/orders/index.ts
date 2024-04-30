import { AuthRequest } from "../../types/global"
import { Response, Router } from "express"
import { prisma } from "../../prisma/client"
import { auth } from "../../auth"
import { storageDisk } from "../../disk"

const ordersRouter = Router()

class OrderController {
    async createOrders(req: AuthRequest, res: Response) {
        try {
            const { customerName, phone, productId, } = req.body

            const orders = await prisma.order.create({
                data: {
                    customerName,
                    customerPhone: phone,
                    productId: Number(productId)
                }
            })
            return res.json({ success: true, data: orders })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Unable to create plants category" })
        }
    }

    async getOrders(req: AuthRequest, res: Response) {
        try {
            const orders: any = await prisma.order.findMany();

            if (!orders.length) {
                return res.json({ success: true, data: [] });
            }

            const ordersWithProducts = await Promise.all(
                orders.map(async (order: any) => {
                    const product = await prisma.product.findUnique({
                        where: { id: order.productId }
                    })
                    return {
                        ...order,
                        product: product
                    }
                })
            )

            return res.json({ success: true, data: ordersWithProducts })
        } catch (error) {
            res.status(500).json({ error: "Unable to retrieve plants categories" })
        }
    }

    async getPlantsCategoryById(req: AuthRequest, res: Response) {
        try {
            const id = parseInt(req.params.id);
    
            const getOrderById = await prisma.order.findUnique({
                where: { id }
            });
    
            if (!getOrderById) {
                return res.status(404).json({ success: false, error: "Order not found" });
            }
    
            const product = await prisma.product.findUnique({
                where: { id: getOrderById.productId }
            });
    
            const orderWithProduct = {
                ...getOrderById,
                product: product
            };
    
            return res.json({ success: true, data: orderWithProduct });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ success: false, error: "Unable to retrieve order" });
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
                    productId: Number(productId)
                }
            })
            return res.json({ success: true, data: updateOrders, message: "Plants category updated" })
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

ordersRouter.post("/", orderController.createOrders)
ordersRouter.get("/", orderController.getOrders)
ordersRouter.get("/:id", orderController.getPlantsCategoryById)
ordersRouter.put("/:id", auth, storageDisk, orderController.updatePlantsCategory)
ordersRouter.delete("/:id", orderController.deletePlantsCategory)

export default ordersRouter