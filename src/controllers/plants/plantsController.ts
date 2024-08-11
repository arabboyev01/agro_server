import { Router } from "express"
import { auth } from "../../auth"
import { storageDisk } from "../../disk"
import { plantProducts } from "../../routes/plants"

const plantsProducts = Router()

plantsProducts.post("/", auth, storageDisk, plantProducts.createPlantsCategory)
plantsProducts.get("/", plantProducts.getPlantsCategories)
plantsProducts.get("/:id", plantProducts.getPlantsCategoryById)
plantsProducts.patch("/:id", auth, storageDisk, plantProducts.updatePlantsCategory)
plantsProducts.delete("/:id", plantProducts.deletePlantsCategory)

export default plantsProducts