import { Request, Response, NextFunction } from 'express'
import path from 'path'
import multer from 'multer'
import { AuthRequest } from '../types/global'

export const storageDisk = (req: AuthRequest, res: Response, next: NextFunction) => {
    let imageName = ''

    const storage = multer.diskStorage({
        destination: path.join('./image'),
        filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
            imageName = Date.now() + path.extname(file.originalname)
            cb(null, imageName)
        },
    })

    const upload = multer({
        storage: storage,
        limits: { fileSize: 10000000 },
    }).single('image')

    upload(req, res, (err: any) => {
        if (err) {
            return res.status(500).json({ message: 'server error', success: false })
        } else {
            const host = req.headers.host
            const filePath = `${req.protocol}://${host}/image/${imageName}`
            req.imageUrl = filePath
            next()
        }
    })
}