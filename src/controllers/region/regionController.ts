import { Router } from 'express'
import { auth } from '../../auth'
import { regionsClass } from '../../routes/region'

const regionRouter = Router()

regionRouter.post('/', auth, regionsClass.createRegion)
regionRouter.get('/', regionsClass.getRegions)
regionRouter.get('/:id', regionsClass.getRegionById)
regionRouter.patch('/:id', auth, regionsClass.updateRegion)
regionRouter.delete('/:id', regionsClass.deleteRegion)

export default regionRouter
