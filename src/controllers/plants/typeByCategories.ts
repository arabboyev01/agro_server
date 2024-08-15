import { Router } from 'express'
import typeCatgory from '../../routes/plantsTypes/typesByCategories'

const TypesByCategories = Router()

TypesByCategories.get('/:categoryId', typeCatgory)
export default TypesByCategories
