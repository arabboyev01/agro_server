import { Request } from 'express'

interface AuthRequest extends Request {
  user?: User
  isAdmin?: string | boolean
  imageUrl?: string
  isUser?: boolean
}

interface Cart {
  id: number
  userId: number
  productId: number
  users: User
  products: Product
  count: number
}

interface Product {
  id: number
}

interface User {
  id: number
  email: string
  password: string
  role: string
  createdAt: Date
  updatedAt: Date
  Carts?: Cart[]
}

export { AuthRequest }
