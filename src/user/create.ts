import { prisma } from '../utils/prisma/client'
import { Router, Response } from 'express'
import { AuthRequest } from '../types/global'
import { error, success } from '../utils/global/error'
import { hashingPassword } from '../utils/hash'
import { generateToken } from '../utils/token'

const createUser = Router()

createUser.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, role } = req.body
    const hashPassword = await hashingPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        role: role,
      },
    })

    if (!user) {
      return res.status(403).json({ ...error })
    }

    const token = generateToken(user.id)
    return res.status(201).json({ ...success, message: 'user created', token, user })
  } catch (err: unknown) {
    return res.status(501).json({ ...error, message: (err as Error).message })
  }
})
export default createUser
