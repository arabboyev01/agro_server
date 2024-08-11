import { Router } from "express"
import { auth } from "../../auth"
import { districts } from "../../routes/district"

const districtRouter = Router()

districtRouter.post("/", auth, districts.createDistrict)
districtRouter.get("/", districts.getDistricts)
districtRouter.get("/:id", districts.getDistrictByCategory)
districtRouter.patch("/:id", auth, districts.updateDistrict)
districtRouter.delete("/:id", districts.deleteDistricts)

export default districtRouter