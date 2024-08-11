import { Router } from "express"
import { auth } from "../../auth"
import { mapInfos } from "../../routes/map"

const mapInformation = Router()

mapInformation.post("/", auth, mapInfos.createMap)
mapInformation.get("/", auth, mapInfos.getMaps)
mapInformation.get("/:id", auth, mapInfos.getMapById)
mapInformation.put("/:id", auth, mapInfos.updateMap)
mapInformation.delete("/:id", mapInfos.deleteMap)

export default mapInformation