import express from "express"
import cors from "cors"

import createUser from "./user/create"
import getUser from "./user/getUser"
import login from "./user/login"
import plantsCategoryRouter from "./routes/plantsCategories"
import plantsTypeRouter from "./routes/plantsTypes"
import plantsProducts from "./routes/plants"
import productRouter from "./routes/product"
import ordersRouter from "./routes/orders"
import consultationRouter from "./routes/consultation"
import varityDetails from "./routes/varityDetails"
import mapInformation from "./routes/map"
import TypesByCategories from "./routes/plantsTypes/typesByCategories"
import regionRouter from "./routes/region"
import districtRouter from "./routes/district"
import distrcitsByRegionId from "./routes/district/districtsByRegionId"

const app = express()

app.use(express.json())
app.use(cors())
app.use('/image', express.static('image'))

const PORT = 3500

app.use("/api/v1/user", createUser)
app.use("/api/v1/user", getUser)
app.use("/api/v1/login", login)
app.use("/api/v1/plants-category", plantsCategoryRouter)
app.use("/api/v1/plants-types", plantsTypeRouter)
app.use("/api/v1/plant", plantsProducts)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/orders", ordersRouter)
app.use("/api/v1/consultant", consultationRouter)
app.use("/api/v1/varity-details", varityDetails)
app.use("/api/v1/map", mapInformation)
app.use("/api/v1/types-id", TypesByCategories)
app.use("/api/v1/region", regionRouter)
app.use("/api/v1/district", districtRouter)
app.use("/api/v1/district-by-region-id", distrcitsByRegionId)

app.listen(PORT, () => {
    console.log(`Port running on ${PORT}`)
})