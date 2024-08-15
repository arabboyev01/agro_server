import { Response, NextFunction } from 'express'
import { AuthRequest } from '../types/global'
import { error } from '../utils/global/error'

async function isAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.isAdmin) {
      return res.status(403).json({
        ...error,
        message: 'Forbbidden to create or update',
      })
    }
    next()
  } catch (error: unknown) {
    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong' + (error as Error).message,
    })
  }
}
export default isAdmin
