import { AuthRequest } from "../../types/global";
import { Response, Router } from "express";
import { prisma } from "../../prisma/client";
import { auth } from "../../auth";
import { storageDisk } from "../../disk";

const productRouter = Router();

class ProductController {
  async createPlantsCategory(req: AuthRequest, res: Response) {
    try {
      if (!req.isAdmin) {
        return res.status(403).json({ success: false, message: "Unathorized" });
      }

      const { name_uz, name_ru, name_en, plantTypeId, price } = req.body;
      const imageUrl: string = req.imageUrl as string;

      const newPlantsCategory = await prisma.product.create({
        data: {
          name_uz,
          name_ru,
          name_en,
          image: imageUrl,
          plantTypeId: Number(plantTypeId),
          price: Number(price),
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
      const search: string = req.query.search as string;
      const categoryId: string = req.query.categoryId as string
      console.log(categoryId)
      let plantsCategories
      const allProducts = await prisma.product.findMany();
      if (search) {
        plantsCategories = allProducts.filter((item) => {
          return (
            item.name_uz.toLowerCase().includes(search.toLowerCase()) ||
            item.name_ru.toLowerCase().includes(search.toLowerCase()) ||
            item.name_en.toLowerCase().includes(search.toLowerCase())
          )
        })
      } else if(categoryId){
        plantsCategories = await prisma.product.findMany({
          where: {
            plantTypeId: parseInt(categoryId),
          },
        });
      }else {
        plantsCategories = allProducts;
      }
      return res.json({ success: true, data: plantsCategories });
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve plants categories" });
    }
  }

  async getPlantsCategoryById(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const plantsCategory = await prisma.product.findUnique({
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
      const { name_uz, name_ru, name_en, plantTypeId, price } = req.body;
      const imageUrl: string = req.imageUrl as string;

      const updatedPlantsCategory = await prisma.product.update({
        where: { id },
        data: {
          name_uz,
          name_ru,
          name_en,
          image: imageUrl,
          plantTypeId: Number(plantTypeId),
          price: Number(price),
        },
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
      await prisma.product.delete({
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

const productController = new ProductController();

productRouter.post(
  "/",
  auth,
  storageDisk,
  productController.createPlantsCategory
);
productRouter.get("/", productController.getPlantsCategories);
productRouter.get("/:id", productController.getPlantsCategoryById);
productRouter.put(
  "/:id",
  auth,
  storageDisk,
  productController.updatePlantsCategory
);
productRouter.delete("/:id", productController.deletePlantsCategory);

export default productRouter;
