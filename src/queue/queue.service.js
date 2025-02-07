//functionya re-usable

import { findDoctorById } from "../doctor/doctor.repository.js";
import { updateScheduleByDoctor } from "../doctor/doctor.service.js";
import { findScheduleByDoctor } from "../schedule/schedule.repository.js";
import { findUserById } from "../user/user.repository.js";
import { deleteQueue, editQueue, findAllQueue, findQueueById, insertQueue, latestQueue } from "./queue.repository.js";
import dayjs from "dayjs";
import "dayjs/locale/id.js";

dayjs.locale("id"); // Set locale ke bahasa Indonesia

export const getAllQueue = async (filters) => {
    try {
        const { userId, doctorId, date, time, status, page, limit, sort, polyclinicId } = filters;
        const skip = (page - 1) * limit;
        const filterData = {};

        if (userId) filterData.userId = userId;
        if (polyclinicId) filterData.polyclinicId = polyclinicId;
        if (time) filterData.time = time;
        if (doctorId) filterData.doctorId = doctorId;
        if (date) filterData.date = date;
        if (status) filterData.status = { in: Array.isArray(status) ? status : [status] };

        const sorting = {}
        if (!sort) {
            sorting['date'] = 'asc'
        } else {
            sorting['createdAt'] = sort
        }

        const queue = await findAllQueue(filterData, sorting, skip, limit);
        return queue;
    } catch (error) {
        throw new Error(error.message);
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
    try {
        const { doctorId, date, userId } = payload;
        const dayName = dayjs(date, "DD-MM-YYYY").format("dddd").toLowerCase();

        //cek daftar hari yang sama
        const { queues: isQueueAvailabled } = await findUserById(userId)
        const isQueue = isQueueAvailabled.some(data => data.date === date);
        if (isQueue) {
            throw new Error("Tidak dapat mendaftar di hari yang sama")
        }

        //cek poliklinik
        const { polyclinicId } = await findDoctorById(doctorId)
        if (!polyclinicId) {
            throw new Error("Poliklinik tidak ditemukan")
        }

        //cek user
        const user = await findUserById(userId);
        if (!user) {
            throw new Error("User tidak ditemukan")
        }

        //cek dokter
        const schedule = await findScheduleByDoctor(doctorId)
        if (!schedule) {
            throw new Error("Jadwal Dokter tidak ditemukan")
        }

        //cek ketersedian schedule
        const time = schedule.find(data => data.day === dayName)?.startTime;
        if (!time) {
            throw new Error("Jadwal Dokter pada hari tersebut tidak tersedia")
        }

        //mengurangi kuota dokter
        const count = -1
        await updateScheduleByDoctor(doctorId, { day: dayName }, count);

        //menambahkan antrean
        const queueNumber = await latestQueue({ doctorId, date });
        await insertQueue({ ...payload, polyclinicId, queueNumber, time, status: "waiting" });

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
        const { doctorId, date, status } = payload

        //cek queue
        const queue = await findQueueById(id);
        if (!queue) {
            throw new Error("Antrean dengan Id tersebut tidak ditemukan");
        }

        //cek schedules dan dokter
        const schedule = await findScheduleByDoctor(doctorId)
        if (!schedule) {
            throw new Error("Jadwal Dokter tidak ditemukan")

        }
        if (status === "cancel") {
            const count = 1
            const dayName = dayjs(date, "DD-MM-YYYY").format("dddd").toLowerCase();

            //mengurangi kuota dokter
            await updateScheduleByDoctor(doctorId, { day: dayName }, count);
        }

        await editQueue(id, payload);
    } catch (error) {
        throw new Error(error.message);
    }
};
