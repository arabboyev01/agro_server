import express from "express"
import createProduct from "./routes/products/createProducts"
import getProducts from "./routes/products/getProcuts"
const app = express()

app.use(express.json())

const PORT = 3500

app.use('/api/v1/products', createProduct)
app.use('/api/v1/products', getProducts)

app.listen(PORT, () => {
    console.log(`Port running on ${PORT}`)
})