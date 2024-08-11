import { Router } from "express"
import varityDetailsRoute from "../../routes/varityDetails"

const varityDetails = Router()

varityDetails.get("/", varityDetailsRoute)

export default varityDetails