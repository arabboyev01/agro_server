import { AuthRequest } from "../../types/global";
import { Response } from "express";
import { prisma } from "../../utils/prisma/client";

class PlantsTypeController {
  async createPlantsCategory(req: AuthRequest, res: Response) {
    try {
      if (!req.isAdmin) {
        return res.status(403).json({ success: false, message: "Unathorized" });
      }

      const { name_uz, name_ru, name_en, categoryId } = req.body;
      const imageUrl: string = req.imageUrl as string;

      const newPlantsCategory = await prisma.plantsType.create({
        data: {
          name_uz,
          name_ru,
          name_en,
          image: imageUrl,
          categoryId: Number(categoryId),
        },
      });
      return res.json({ success: true, data: newPlantsCategory });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Unable to create plants category" });
    }
  }

  async getPlantsCategories(req: AuthRequest, res: Response) {
    try {
      const plantsCategories = await prisma.plantsType.findMany();
      return res.json({ success: true, data: plantsCategories });
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve plants categories" });
    }
  }

  async getPlantsCategoryById(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const plantsCategory = await prisma.plantsType.findUnique({
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

      if (req.body.categoryId) {
        req.body.categoryId = Number(req.body.categoryId);
      }
      const updatedPlantsCategory = await prisma.plantsType.update({
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
        .json({
          success: false,
          error: "Internal server error" + (error as Error).message,
        });
    }
  }

  async deletePlantsCategory(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await prisma.plantsType.delete({
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

export const plantsTypeController = new PlantsTypeController();
