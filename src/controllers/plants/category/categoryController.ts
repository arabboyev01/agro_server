import { Router } from 'express'
import { auth } from '../../../auth'
import { storageDisk } from '../../../utils/disk'
import { plantsCategoryController } from '../../../routes/plantsCategories'

const plantsCategoryRouter = Router()

plantsCategoryRouter.post('/', auth, storageDisk, plantsCategoryController.createPlantsCategory)
plantsCategoryRouter.get('/', plantsCategoryController.getPlantsCategories)
plantsCategoryRouter.get('/:id', plantsCategoryController.getPlantsCategoryById)
plantsCategoryRouter.patch('/:id', auth, storageDisk, plantsCategoryController.updatePlantsCategory)
plantsCategoryRouter.delete('/:id', plantsCategoryController.deletePlantsCategory)

export default plantsCategoryRouter
