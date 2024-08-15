import { Response } from "express";
import { AuthRequest } from "../../types/global";
import { error } from "../../utils/global/error";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const varityDetailsRoute = async (req: AuthRequest, res: Response) => {
  try {
    const type: string = req.query.type as string;
    const category: string = req.query.category as string;
    if (!type || !category)
      return res
        .status(400)
        .json({ success: false, message: "please provide quereis correctly!" });

    const plants = await prisma.plant.findMany({
      where: {
        plantTypeId: {
          equals: parseInt(type),
        },
        plantsCategoryId: {
          equals: parseInt(category),
        },
      },
    });

    return res.json({ success: true, data: plants });
  } catch (err: unknown) {
    return res.status(500).json({ ...error });
  }
};
export default varityDetailsRoute;
