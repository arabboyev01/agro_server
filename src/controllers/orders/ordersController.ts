import { Router } from 'express'
import { auth } from '../../auth'
import { storageDisk } from '../../utils/disk'
import { orderController } from '../../routes/orders'

const ordersRouter = Router()

ordersRouter.post('/', orderController.createOrders)
ordersRouter.get('/', orderController.getOrders)
ordersRouter.get('/:id', orderController.getPlantsCategoryById)
ordersRouter.patch('/:id', auth, storageDisk, orderController.updatePlantsCategory)
ordersRouter.delete('/:id', orderController.deletePlantsCategory)

export default ordersRouter
