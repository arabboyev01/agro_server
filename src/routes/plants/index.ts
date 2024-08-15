import { AuthRequest } from "../../types/global"
import { Response } from "express"
import { prisma } from "../../utils/prisma/client"
import { error } from "../../utils/global/error"

class PlantProducts {
  async createPlantsCategory(req: AuthRequest, res: Response) {
    try {
      if (!req.isAdmin) {
        return res.status(403).json({ success: false, message: "Unathorized" });
      }

      const {
        name_uz,
        name_en,
        name_ru,
        plantsCategoryId,
        plantTypeId,
        describtion_uz,
        describtion_ru,
        describtion_en,
      } = req.body;

      if (
        !name_en ||
        !name_uz ||
        !name_ru ||
        !plantsCategoryId ||
        !plantTypeId ||
        !describtion_uz ||
        !describtion_ru ||
        !describtion_en
      ) {
        return res.status(400).json({ ...error });
      }
      const imageUrl: string = req.imageUrl as string;

      const newPlant = await prisma.plant.create({
        data: {
          name_uz,
          name_ru,
          name_en,
          image: imageUrl,
          plantTypeId: Number(plantTypeId),
          plantsCategoryId: Number(plantsCategoryId),
          describtion_en,
          describtion_ru,
          describtion_uz,
        },
      });
      return res.json({ success: true, data: newPlant });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Unable to create plants category" });
    }
  }

  async getPlantsCategories(req: AuthRequest, res: Response) {
    const categoryId: string = req.query.type as string;
    try {
      let plantsCategory;

      if (categoryId) {
        plantsCategory = await prisma.plant.findMany({
          where: { plantTypeId: Number(categoryId) },
        });
      } else {
        plantsCategory = await prisma.plant.findMany();
      }

      return res.json({ success: true, data: plantsCategory });
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve plants categories" });
    }
  }

  async getPlantsCategoryById(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const plantsCategory = await prisma.plant.findUnique({
        where: { id },
      });
      if (!plantsCategory) {
        return res
          .status(404)
          .json({ success: false, error: "Plants category not found" });
      }
      return res.json({ success: true, data: plantsCategory });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Unable to create plants category" });
    }
  }

  async updatePlantsCategory(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);

      if (!req.isAdmin) {
        return res.status(403).json({ success: false, message: "Unathorized" });
      }

      const imageUrl: string = req.imageUrl as string;
      if (req.body.plantTypeId) {
        req.body.plantTypeId = Number(req.body.plantTypeId);
      }

      if (req.body.plantsCategoryId) {
        req.body.plantsCategoryId = Number(req.body.plantsCategoryId);
      }

      const updatedPlantsCategory = await prisma.plant.update({
        where: { id },
        data: { ...req.body, image: imageUrl },
      });
      return res.json({
        success: true,
        data: updatedPlantsCategory,
        message: "Plants category updated",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Unable to create plants category" });
    }
  }

  async deletePlantsCategory(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await prisma.plant.delete({
        where: { id },
      });
      return res.json({
        success: true,
        message: "Plants category deleted successfully",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Unable to create plants category" });
    }
  }
}

export const plantProducts = new PlantProducts();
