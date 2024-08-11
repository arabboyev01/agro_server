import { Router } from "express"
import { auth } from "../../../auth"
import { storageDisk } from "../../../disk"
import { plantsTypeController } from "../../../routes/plantsTypes"

const plantsTypeRouter = Router()

plantsTypeRouter.post("/", auth, storageDisk, plantsTypeController.createPlantsCategory)
plantsTypeRouter.get("/", plantsTypeController.getPlantsCategories)
plantsTypeRouter.get("/:id", plantsTypeController.getPlantsCategoryById)
plantsTypeRouter.put("/:id", auth, storageDisk, plantsTypeController.updatePlantsCategory)
plantsTypeRouter.delete("/:id", plantsTypeController.deletePlantsCategory)

export default plantsTypeRouter