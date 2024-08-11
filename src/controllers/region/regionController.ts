import { Router } from "express"
import { auth } from "../../auth"
import { storageDisk } from "../../disk"
import { regionsClass } from "../../routes/region"

const regionRouter = Router()

regionRouter.post(
    "/",
    auth,
    storageDisk,
    regionsClass.createRegion
)
regionRouter.get("/", regionsClass.getRegions)
regionRouter.get("/:id", regionsClass.getRegionById)
regionRouter.put(
    "/:id",
    auth,
    storageDisk,
    regionsClass.updateRegion
)
regionRouter.delete("/:id", regionsClass.deleteRegion)

export default regionRouter