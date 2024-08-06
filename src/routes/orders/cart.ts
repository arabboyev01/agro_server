import { PrismaClient } from "@prisma/client";
import { Response, Router } from "express";
import { auth } from "../../auth";
import { AuthRequest } from "../../types/global";

const prisma = new PrismaClient();
const Card = Router();

const createCArtorders = async (req: AuthRequest, res: Response) => {
  try {
  const data = await prisma.cart.create({
    data: {
      userId: Number(req.user.id),
      productId: Number(req.body.productId),
      count: Number(req.body.count),
    },
  })

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
      })
  }
}

const gupdateCArtorders = async (req: AuthRequest, res: Response) => {
  try {
  const { id } = req.params

  const cart = await prisma.cart.findUnique({
    where: { productId: Number(id)}
  })

  if(!cart) return res.status(403).json({ success: false, message: "product not found" })

  const data = await prisma.cart.update({
    where: { id: Number(cart.id) },
    data: {
      count: Number(req.body.count),
    },
  })


  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong " });
  }

  return res.status(200).json({ success: true, data });
  } catch (err: unknown) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Interna server error" + (err as Error).message,
      })
  }
}

const getArtorders = async (req: AuthRequest, res: Response) => {
  try {
    const data = await prisma.cart.findMany({
      where: { userId: Number(req?.user?.id) },
      include: {
        prodcuts: true,
      },
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
}

const delArtorders = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const deleted = await prisma.cart.delete({
      where: { id: Number(id) },
    })

    if (!deleted) {
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong " });
    }

    return res.status(202).json({ success: true, message: "Deleted" });
  } catch (err: unknown) {
    return res.status(500).json({
      success: false,
      message: "Interna server error" + (err as Error).message,
    })
  }
}

Card.post("/", auth, createCArtorders)
Card.patch("/:id", auth, gupdateCArtorders)
Card.get("/", auth, getArtorders)
Card.delete("/:id", auth, delArtorders)

export default Card
