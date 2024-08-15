import { Router } from "express"
import { auth } from "../../auth"
import isAdmin from "../../auth/admin"
import { storageDisk } from "../../utils/disk"
import { consultationController } from "../../routes/consultation"

const consultationRouter = Router()

consultationRouter.post("/", auth, isAdmin, storageDisk, consultationController.creaateConsultation)
consultationRouter.get("/", consultationController.getConsultation)
consultationRouter.get("/:id", consultationController.getConsultationById)
consultationRouter.patch("/:id", auth, isAdmin, storageDisk, consultationController.updatePlantsCategory)
consultationRouter.delete("/:id", consultationController.deleteConsultant)

export default consultationRouter