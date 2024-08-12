import { Router } from "express"
import { auth } from "../../auth"
import { storageDisk } from "../../disk"
import { productController } from "../../routes/product"

const productRouter = Router()


productRouter.post("/", auth, storageDisk, productController.createPlantsCategory)
productRouter.get("/", productController.getPlantsCategories)
productRouter.get("/:id", productController.getPlantsCategoryById)
productRouter.patch("/:id", auth, storageDisk, productController.updatePlantsCategory)
productRouter.delete("/:id", productController.deletePlantsCategory)

export default productRouter