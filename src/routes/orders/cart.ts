import { PrismaClient } from "@prisma/client"
import { Response, Router } from "express"
import { auth } from "../../auth"
import { AuthRequest } from "../../types/global"

const prisma = new PrismaClient()
const Card = Router()

const createCArtorders = async (req: AuthRequest, res: Response) => {
  console.log(req.user)
  try {
    const data = await prisma.cart.create({
      data: {
        userId: Number(req.user.id),
        productId: Number(req.body.productId),
        count: Number(req.body.count),
      },
    });

    console.log(data);

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
};

const gupdateCArtorders = async (req: AuthRequest, res: Response) => {
  console.log(req.user);
  try {
    const data = await prisma.cart.update({
      where: { userId: Number(req?.user?.id) },
      data: {
        count: Number(req.body.count),
      },
    });

    console.log(data);

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
};

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
};

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

Card.post("/", auth, createCArtorders)
Card.patch("/", auth, gupdateCArtorders)
Card.get("/", auth, getArtorders)
Card.delete("/", auth, delArtorders)

export default Card;