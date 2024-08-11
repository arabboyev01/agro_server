import { Router } from "express"
import { auth } from "../../auth"
import { storageDisk } from "../../disk"
import { districts } from "../../routes/district"

const districtRouter = Router()

districtRouter.post("/", auth, storageDisk, districts.createDistrict)
districtRouter.get("/", districts.getDistricts)
districtRouter.get("/:id", districts.getDistrictByCategory)
districtRouter.put("/:id", auth, storageDisk, districts.updateDistrict)
districtRouter.delete("/:id", districts.deleteDistricts)

export default districtRouter