import { prisma } from "../../lib/prisma.js";

export const findAllPolys = async () => {
    try {
        const polys = await prisma.polyclinics.findMany();
        return polys;
    } catch (error) {
        throw new Error("Server Terjadi Gangguan 1");
    }
}

export const findPolyById = async (id) => {
    try {
        const poly = await prisma.polyclinics.findUnique({
            where: { id }
        });
        return poly;
    } catch (error) {
        throw new Error(error);
    }
}