//berkomunikasi dengan database
//dapat menggunakan orm atau query raw
//supaya untuk mengganti ORM tinggal ganti pada file ini aja kok

import prisma from "../../lib/prisma.js";

export const findAllQueue = async (data) => {
    try {
        const queues = await prisma.queues.findMany({
            where: data
        });
        return queues;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan mengambil semua antrean");
    }
}

export const findQueueById = async (id) => {
    try {
        const queue = await prisma.queues.findUnique({
            where: { id }
        });
        return queue;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan mengambil antrean berdasarkan ID");
    }
}
export const latestQueue = async (payload) => {
    try {
        const { doctorId, date, time } = payload
        const latestQueue = await prisma.queues.findFirst({
            where: {
                doctorId, date, time
            },
            orderBy: {
                queueNumber: 'desc'
            }
        })
        return latestQueue ? latestQueue.queueNumber + 1 : 1;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan mengambil antrean terbaru");
    }
}

export const insertQueue = async (data) => {
    console.log(data)
    try {
        await prisma.queues.create({ data });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan menambahkan antrean");
    }
};

export const deleteQueue = async (id) => {
    try {
        await prisma.queues.delete({
            where: { id },
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan menghapus antrean");
    }
};

export const editQueue = async (id, data) => {
    try {
        await prisma.queues.update({
            where: { id },
            data
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan mengubah antrean");
    }
};

