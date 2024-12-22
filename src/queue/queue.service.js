//functionya re-usable

import { deleteQueue, editQueue, findAllQueue, findQueueById, insertQueue } from "./queue.repository.js";


export const getAllQueue = async () => {
    try {
        const queue = await findAllQueue();
        return queue;
    } catch (error) {
        throw new Error("Gagal Mengambil Seluruh Data Antrean");
    }
};

export const getQueueById = async (id) => {
    try {
        const queue = await findQueueById(id);
        if (!queue) {
            throw new Error("Antrean dengan Id tersebut tidak ditemukan");
        }
        return queue;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createQueue = async (payload) => {
    //validasi apakah nama produk sudah ada
    try {
        await insertQueue(payload)
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteQueueById = async (id) => {
    try {
        await getQueueById(id);
        await deleteQueue(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateQueue = async (id, payload) => {
    try {
        const queue = await findQueueById(id);
        if (!queue) {
            throw new Error("Antrean dengan Id tersebut tidak ditemukan");
        }
        await editQueue(id, payload);
    } catch (error) {
        throw new Error(error.message);
    }
};
