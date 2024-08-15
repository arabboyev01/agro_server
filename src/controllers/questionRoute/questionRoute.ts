import { questionRoute, getAllQuestionRoute } from '../../routes/questions/questions'
import { Router } from 'express'

const questionRouter = Router()

questionRouter.get('/', getAllQuestionRoute)
questionRouter.post('/', questionRoute)

export default questionRouter
