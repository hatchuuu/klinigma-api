//functionya re-usable

import { findDoctorById } from "../doctor/doctor.repository.js";
import { findScheduleByDoctor } from "../schedule/schedule.repository.js";
import { findUserById } from "../user/user.repository.js";
import { deleteQueue, editQueue, findAllQueue, findQueueById, insertQueue, latestQueue } from "./queue.repository.js";


export const getAllQueue = async (filters) => {
    try {
        const { userId, doctorId, parsedDate, time, status } = filters;

        const filterData = {};

        if (userId) filterData.userId = userId;
        if (time) filterData.time = time;
        if (doctorId) filterData.doctorId = doctorId;
        if (parsedDate) filterData.date = parsedDate;
        if (status) filterData.status = status;

        const queue = await findAllQueue(filterData);
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

const getDayName = (date) => {
    const daysInIndonesian = new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(new Date(date));
    return daysInIndonesian.toLowerCase();
}

export const createQueue = async (payload) => {
    try {
        const { doctorId, date, time, userId } = payload;

        const dayName = getDayName(date);
        const schedule = await findScheduleByDoctor(doctorId)
        const user = await findUserById(userId);

        if (!user) {
            throw new Error("User tidak ditemukan")
        }
        if (!schedule) {
            throw new Error("Jadwal Dokter tidak ditemukan")
        }
        const isValidSchedule = schedule.some(data => data.day === dayName && data.startTime === time);
        if (!isValidSchedule) {
            throw new Error("Jadwal Dokter pada hari tersebut tidak tersedia")
        }
        const queueNumber = await latestQueue({ doctorId, date, time });
        await insertQueue({ ...payload, queueNumber });
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
