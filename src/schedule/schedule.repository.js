import prisma from "../../lib/prisma.js";

export const findAllSchedules = async () => {
    try {
        const schedules = await prisma.schedules.findMany();
        return schedules;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan mengambil seluruh data jadwal");
    }
}

export const findScheduleByDoctor = async (doctorId) => {
    try {
        const schedule = await prisma.schedules.findMany({
            where: { doctorId }
        });
        return schedule;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan mengambil data berdasarkan Dokter");
    }
}
export const findScheduleById = async (id) => {
    try {
        const schedule = await prisma.schedules.findUnique({
            where: { id }
        });
        return schedule;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan mengambil data berdasarkan ID");
    }
}

export const insertSchedule = async (data) => {
    try {
        await prisma.schedules.create({
            data
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan dalam penambahan jadwal");
    }
};

export const deleteSchedule = async (id) => {
    try {
        await prisma.schedules.delete({
            where: { id },
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan dalam penghapusan jadwal");
    }
};

export const editSchedule = async (id, data) => {
    try {
        await prisma.schedules.update({
            where: { id },
            data
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan dalam mengubah jadwal");
    }
};