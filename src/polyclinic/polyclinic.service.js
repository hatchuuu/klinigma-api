import { findAllPolys, findPolyById } from "./polyclinic.repository.js";

export const getAllPoly = async () => {
    try {
        const polys = await findAllPolys();
        return polys;
    } catch (error) {
        throw new Error("Gagal Mengambil Seluruh Data Poliklinik");
    }
};

export const getPolyById = async (id) => {
    try {
        const poly = await findPolyById(id);
        if (!poly) {
            throw new Error("Poliklinik dengan Id tersebut tidak ditemukan");
        }
        return poly;
    } catch (error) {
        throw new Error(error.message);
    }
}