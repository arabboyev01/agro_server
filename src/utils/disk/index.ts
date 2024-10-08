import { Request, Response, NextFunction } from 'express'
import path from 'path'
import multer from 'multer'
import { AuthRequest } from '../../types/global'

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

  upload(req, res, (err: unknown) => {
    if (err) {
      return res.status(500).json({
        message: 'Server error ' + (err as Error).message,
        success: false,
      })
    } else {
      if (req.file) {
        const host = req.headers.host
        const filePath = `${req.protocol}://${host}/image/${imageName}`
        req.imageUrl = filePath
      } else if (req.body.image) {
        req.imageUrl = req.body.image
      } else {
        res.status(400).json({
          success: false,
          message: 'No file or image URL provided',
        })
      }
      next()
    }
  })
}
