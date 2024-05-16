import { AuthRequest } from "../../types/global"
import { Response, Router } from "express"
import { prisma } from "../../prisma/client"
import { auth } from "../../auth"
import { success, error } from "../../global/error"
import { informationType } from "../../token/type"
import { utils } from "./utils"

const mapInformation = Router()

class MapInfos {
    async createMap(req: AuthRequest, res: Response) {
        try {
            const { address, crops, lat, long, soilsContent, regionId, districtId, userId } = req.body

            const information = await prisma.information.create({
                data: {
                    regionId: Number(regionId),
                    districtId: Number(districtId),
                    address,
                    crops,
                    lat,
                    long,
                    soilsContent: soilsContent,
                    userId: Number(userId)
                },
            });

            return res.status(201).json({ ...success, data: information });
        } catch (err) {
            return res.status(500).send({ ...error, message: (err as Error).message })
        }
    }

    async getMaps(req: AuthRequest, res: Response) {
        try {
            let information: informationType[] = []

            if (req?.isAdmin) {
                information = await prisma.information.findMany();
            }  
            if (req?.isUser) {
                information = await prisma.information.findMany({
                    where: { userId: Number(req?.user?.id) }
                });
            }

            if (!information || information.length === 0) {
                return res.status(404).json({ ...error, message: "Information not found." });
            }

            const mappedInformation = await utils(req, information)

            return res.status(200).json({ ...success, data: mappedInformation });
        } catch (err: unknown) {
            return res.status(500).send({ ...error, message: (err as Error).message });
        }
    }

    async getMapById(req: AuthRequest, res: Response) {
        try {
            let information;

            if (req ?.isAdmin) {
                information = await prisma.information.findUnique({
                    where: { id: Number(req.params.id) }
                });
            } else if (req ?.isUser) {
                information = await prisma.information.findUnique({
                    where: {
                        id: Number(req.params.id),
                        userId: Number(req?.user?.id)
                    }
                });
            }

            if (!information) {
                return res.status(404).json({ ...error, message: "Information not found." });
            }

            const regionPromise = prisma.region.findUnique({
                where: { id: information.regionId }
            });

            const typesPromise = prisma.plantsType.findMany({
                where: {
                    id: {
                        in: JSON.parse(information.crops)
                    }
                }
            });

            const districtPromise = prisma.district.findUnique({
                where: { id: information.districtId }
            });

            const [region, types, district] = await Promise.all([regionPromise, typesPromise, districtPromise]);

            const mappedInformation = {
                ...information,
                region: region,
                district: district,
                crops: types
            };

            return res.status(200).json({ ...success, data: mappedInformation });
        } catch (err: unknown) {
            return res.status(500).send({ ...error, message: (err as Error).message });
        }
    }



    async updateMap(req: AuthRequest, res: Response) {
        try {
            const { address, crops, lat, long, soilsContent, regionId, districtId, userId } = req.body
            const id: string = req.params.id as string

            const information = await prisma.information.update({
                where: { id: Number(id) },
                data: {
                    regionId: Number(regionId),
                    districtId: Number(districtId),
                    address,
                    crops,
                    lat,
                    long,
                    soilsContent: soilsContent,
                    userId: Number(userId)
                }
            })

            return res.status(200).json({ ...success, data: information });
        } catch (err: unknown) {
            return res.status(500).send({ ...error, message: (err as Error).message });
        }
    }

    async deleteMap(req: AuthRequest, res: Response) {
        try {
            const id = parseInt(req.params.id)
            await prisma.information.delete({
                where: { id }
            });
            return res.json({ success: true, message: "Map information deleted" })
        } catch (error: unknown) {
            return res.status(500).json({ success: false, error: (error as Error).message })
        }
    }
}

const mapInfos = new MapInfos()

mapInformation.post("/", auth, mapInfos.createMap)
mapInformation.get("/", auth, mapInfos.getMaps)
mapInformation.get("/:id", auth, mapInfos.getMapById)
mapInformation.put("/:id", auth, mapInfos.updateMap)
mapInformation.delete("/:id", mapInfos.deleteMap)

export default mapInformation