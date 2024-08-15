import express from 'express'
import cors from 'cors'

import createUser from './user/create'
import getUser from './user/getUser'
import login from './user/login'
import userRole from './user/roleUser'
import { createUserIfNotExists } from './utils/prisma/client'
import consultationRouter from './controllers/consultation/consultants'
import districtRouter from './controllers/district/district'
import mapInformation from './controllers/map/map'
import Card from './controllers/orders/cart'
import ordersRouter from './controllers/orders/ordersController'
import plantsCategoryRouter from './controllers/plants/category/categoryController'
import plantsProducts from './controllers/plants/plantsController'
import plantsTypeRouter from './controllers/plants/types/typesController'
import productRouter from './controllers/products/productsController'
import regionRouter from './controllers/region/regionController'
import distrcitsByRegionId from './controllers/district/byRegionId/byRegionId'
import varityDetails from './controllers/varities/varityController'
import TypesByCategories from './controllers/plants/typeByCategories'
import questionRouter from './controllers/questionRoute/questionRoute'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/image', express.static('image'))

const PORT = process.env.PORT || 3500

app.use('/', createUserIfNotExists)
app.use('/api/v1/user', createUser)
app.use('/api/v1/user', getUser)
app.use('/api/v1/login', login)
app.use('/api/v1/plants-category', plantsCategoryRouter)
app.use('/api/v1/plants-types', plantsTypeRouter)
app.use('/api/v1/plant', plantsProducts)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', ordersRouter)
app.use('/api/v1/consultant', consultationRouter)
app.use('/api/v1/varity-details', varityDetails)
app.use('/api/v1/map', mapInformation)
app.use('/api/v1/types-id', TypesByCategories)
app.use('/api/v1/region', regionRouter)
app.use('/api/v1/district', districtRouter)
app.use('/api/v1/district-by-region-id', distrcitsByRegionId)
app.use('/api/v1/user-role', userRole)
app.use('/api/v1/cart', Card)
app.use('/api/v1/question', questionRouter)

app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`)
})
