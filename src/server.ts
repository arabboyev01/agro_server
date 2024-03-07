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

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 3600

app.use("/api/v1/user", createUser)
app.use("/api/v1/user", getUser)
app.use("/api/v1/login", login)
app.use("/api/v1/plants-category", plantsCategoryRouter)
app.use("/api/v1/plants-types", plantsTypeRouter)
app.use("/api/v1/plant", plantsProducts)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/orders", ordersRouter)

app.listen(PORT, () => {
    console.log(`Port running on ${PORT}`)
})