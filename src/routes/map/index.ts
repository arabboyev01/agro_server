import { AuthRequest } from "../../types/global"
import { Response, Router } from "express"
import { prisma } from "../../prisma/client"
import { auth } from "../../auth"
import { success, error } from "../../global/error"

const mapInformation = Router()

class MapInfos {
    async createMap(req: AuthRequest, res: Response) {
        try {
            const { address, crops, lat, long, SoilsContent } = req.body

            const information = await prisma.information.create({
                data: {
                    address,
                    crops,
                    lat,
                    long,
                    SoilsContent: {
                        create: SoilsContent,
                    },
                },
                include: {
                    SoilsContent: true,
                },
            });

            return res.status(201).json({ ...success, data: information });
        } catch (err) {
            return res.status(500).send({ ...error, message: (err as Error).message })
        }
    }

    async getMaps(req: AuthRequest, res: Response) {
        try {

            const information = await prisma.information.findMany({
                include: {
                    SoilsContent: true,
                },
            })

            return res.status(200).json({ ...success, data: information });
        } catch (err: unknown) {
            return res.status(500).send({ ...error, message: (err as Error).message });
        }
    }

    async getMapById(req: AuthRequest, res: Response) {
        try {

            const information = await prisma.information.findUnique({
                where: { id: Number(req.params.id) },
                include: {
                    SoilsContent: true,
                },
            })

            return res.status(200).json({ ...success, data: information });
        } catch (err: unknown) {
            return res.status(500).send({ ...error, message: (err as Error).message });
        }
    }

    async updateMap(req: AuthRequest, res: Response) {
        try {
            const { address, crops, lat, long, SoilsContent } = req.body
            const id: string = req.params.id as string

            const information = await prisma.information.update({
                where: { id: Number(id) },
                data: {
                    address,
                    crops,
                    lat,
                    long,
                    SoilsContent: {
                        update: SoilsContent,
                    },
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