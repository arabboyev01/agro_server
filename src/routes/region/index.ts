import { AuthRequest } from "../../types/global";
import { Response, Router } from "express";
import { prisma } from "../../prisma/client";
import { auth } from "../../auth";
import { storageDisk } from "../../disk";

const regionRouter = Router();

class RegionsClass {
    async createRegion(req: AuthRequest, res: Response) {
        try {
            if (!req.isAdmin) {
                return res.status(403).json({ success: false, message: "Unathorized" });
            }

            const region = await prisma.region.create({
                data: { ...req.body },
            });
            return res.json({ success: true, data: region });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, error: "Unable to create region" });
        }
    }

    async getRegions(req: AuthRequest, res: Response) {
        try {
            const regions = await prisma.region.findMany()

            return res.json({ success: true, data: regions });
        } catch (error) {
            res.status(500).json({ error: "Unable to retrieve regions" });
        }
    }

    async getRegionById(req: AuthRequest, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const region = await prisma.region.findUnique({
                where: { id },
            });
            if (!region) {
                return res
                    .status(404)
                    .json({ success: false, error: "Region not found" });
            }
            return res.json({ success: true, data: region });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, error: "Unable to get region" });
        }
    }

    async updateRegion(req: AuthRequest, res: Response) {
        try {
            if (!req.isAdmin) {
                return res.status(403).json({ success: false, message: "Unathorized" });
            }

            const region = await prisma.region.create({
                data: { ...req.body },
            });
            return res.json({ success: true, data: region });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, error: "Unable to create region" });
        }
    }

    async deleteRegion(req: AuthRequest, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await prisma.region.delete({
                where: { id },
            });
            return res.json({
                success: true,
                message: "Region deleted successfully",
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, error: "Unable to create plants category" });
        }
    }
}

const regionsClass = new RegionsClass();

regionRouter.post(
    "/",
    auth,
    storageDisk,
    regionsClass.createRegion
);
regionRouter.get("/", regionsClass.getRegions);
regionRouter.get("/:id", regionsClass.getRegionById);
regionRouter.put(
    "/:id",
    auth,
    storageDisk,
    regionsClass.updateRegion
);
regionRouter.delete("/:id", regionsClass.deleteRegion);

export default regionRouter;
