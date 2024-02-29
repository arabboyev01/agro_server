import { Request } from "express"

interface AuthRequest extends Request {
    user?: any
    isAdmin?: string | boolean
    imageUrl?: string
}

export { AuthRequest }