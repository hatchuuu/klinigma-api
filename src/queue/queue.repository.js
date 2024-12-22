//berkomunikasi dengan database
//dapat menggunakan orm atau query raw
//supaya untuk mengganti ORM tinggal ganti pada file ini aja kok

import { prisma } from "../../lib/prisma.js";

export const findAllQueue = async () => {
    try {
        const queues = await prisma.queues.findMany();
        return queues;
    } catch (error) {
        throw new Error("Server Terjadi Gangguan 1");
    }
}

export const findQueueById = async (id) => {
    try {
        const queue = await prisma.queues.findUnique({
            where: { id }
        });
        return queue;
    } catch (error) {
        throw new Error("Server Terjadi Gangguan 2");
    }
}

export const insertQueue = async (data) => {
    try {
        await prisma.queues.create({ data });
    } catch (error) {
        throw new Error("Server Terjadi Gangguan 4");
    }
};

export const deleteQueue = async (id) => {
    try {
        await prisma.queues.delete({
            where: { id },
        });
    } catch (error) {
        throw new Error("Server Terjadi Gangguan 5");
    }
};

export const editQueue = async (id, data) => {
    try {
        await prisma.queues.update({
            where: { id },
            data
        });
    } catch (error) {
        throw new Error("Server Terjadi Gangguan 6");
    }
};

