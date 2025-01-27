import { findAllPolys, findPolyByName, findPolyById, insertPoly, deletePoly, editPoly } from "./polyclinic.repository.js";

export const getAllPoly = async () => {
    try {
        const polys = await findAllPolys();
        return polys;
    } catch (error) {
        throw new Error("Gagal Mengambil Seluruh Data Poliklinik");
    }
};
export const getPolyByName = async (name) => {
    try {
        const poly = await findPolyByName(name);
        return poly
    } catch (error) {
        throw new Error(error.message);
    }
}

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

export const createPoly = async (payload) => {
    try {
        const checkNamePoly = await getPolyByName(payload.polyclinicName);
        if (checkNamePoly) {
            throw new Error("Poly dengan nama tersebut sudah ada");
        }
        const poly = await insertPoly(payload);
        return poly;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deletePolyById = async (id) => {
    try {
        await findPolyById(id);
        await deletePoly(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updatePoly = async (id, payload) => {
    try {
        const poly = await findPolyById(id);
        if (!poly) {
            throw new Error("Poly dengan Id tersebut tidak ditemukan");
        }
        await editPoly(id, payload);
    } catch (error) {
        throw new Error(error.message);
    }
};