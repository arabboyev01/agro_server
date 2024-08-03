import { PrismaClient } from "@prisma/client"
import { Request, Response, Router } from "express"
import { auth } from "../../auth"
import { AuthRequest } from "../../types/global"

const prisma = new PrismaClient()
const Card = Router()

const createCArtorders = async (req: Request, res: Response) => {
    try{
        const data = prisma.cart.create({
            data: { ...req.body }
        })

        if(!data){
            return res.status(400).json({ success: false, message: "Something went wrong "})        
        }

        return res.status(201).json({ success: true, data })
    } catch(err: unknown) {
        return res.status(500).json({ success: false, message: "Interna server error" + (err as Error).message})
    }
}

const gupdateCArtorders = async (req: AuthRequest, res: Response) => {
    try{

        const data = prisma.cart.update({
            where: { userId: Number(req?.user?.id) },
            data: { ...req.body }
        })

        if(!data){
            return res.status(400).json({ success: false, message: "Something went wrong "})        
        }

        return res.status(201).json({ success: true, data })
    } catch(err: unknown) {
        return res.status(500).json({ success: false, message: "Interna server error" + (err as Error).message})
    }
}


const getArtorders = async (req: AuthRequest, res: Response) => {
  try {

    const data = prisma.cart.findMany({
      where: { userId: Number(req?.user?.id) },
      include: {
        prodcuts: true
      }
    });

    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong " });
    }

    return res.status(201).json({ success: true, data });
  } catch (err: unknown) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Interna server error" + (err as Error).message,
      });
  }
}

const delArtorders = async (req: AuthRequest, res: Response) => {
  try {
    const data = prisma.cart.findMany({
      where: { userId: Number(req?.user?.id) },
    });

    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong " });
    }

    return res.status(201).json({ success: true, data });
  } catch (err: unknown) {
    return res.status(500).json({
      success: false,
      message: "Interna server error" + (err as Error).message,
    });
  }
};

Card.post("/", auth, createCArtorders);
Card.patch("/", auth, gupdateCArtorders)
Card.get("/", auth, getArtorders)
Card.delete("/", auth, delArtorders);

export default Card