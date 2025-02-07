import prisma from "../../lib/prisma.js";

export const findAllPolys = async (skip, limit) => {
    try {
        const polys = await prisma.polyclinics.findMany({
            skip: skip,
            take: limit,
        });
        return polys;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan mengambil seluruh data poliklinik");
    }
}

export const findPolyByName = async (polyclinicName) => {
    try {
        const poly = await prisma.polyclinics.findUnique({
            where: { polyclinicName }
        });
        return poly;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan mengambil data berdasarkan nama");
    }
}
export const findPolyById = async (id) => {
    try {
        const poly = await prisma.polyclinics.findUnique({
            where: { id },
            include: {
                // admins: {
                //     select: {
                //         name: true,
                //         email: true
                //     }
                // },
                doctors: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });
        return poly;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan mengambil data berdasarkan ID");
    }
}

export const insertPoly = async (data) => {
    try {
        await prisma.polyclinics.create({
            data
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan dalam penambahan poliklinik");
    }
};

export const deletePoly = async (id) => {
    try {
        await prisma.polyclinics.delete({
            where: { id },
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan dalam penghapusan poliklinik");
    }
};

export const editPoly = async (id, data) => {
    try {
        await prisma.polyclinics.update({
            where: { id },
            data
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan dalam mengubah poliklinik");
    }
};