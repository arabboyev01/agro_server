import { Request } from "express"

interface AuthRequest extends Request {
    user?: any
    isAdmin?: string | boolean
    isCompany?: boolean
    file?: any
    files?: any
    imageUrl?: string
    imageUrlError?: string
    isUser?: boolean
}

export { AuthRequest }