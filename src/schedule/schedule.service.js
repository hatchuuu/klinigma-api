import { findAllSchedules, findScheduleById, insertSchedule, deleteSchedule, editSchedule, findScheduleByDoctor } from "./schedule.repository.js";

export const getAllSchedules = async () => {
    try {
        const schedules = await findAllSchedules();
        return schedules;
    } catch (error) {
        throw new Error("Gagal Mengambil Seluruh Data Jadwal");
    }
};

export const getScheduleById = async (id) => {
    try {
        const schedule = await findScheduleById(id);
        if (!schedule) {
            throw new Error("Jadwal dengan Id tersebut tidak ditemukan");
        }
        return schedule;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createSchedule = async (payload) => {
    try {
        const response = await findScheduleByDoctor(payload.doctorId);
        response.forEach(data => {
            if (data.day == payload.day) {
                throw new Error("Jadwal Dokter pada hari tersebut sudah ada");
            }
        });
        const schedule = await insertSchedule(payload);
        return schedule;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteScheduleById = async (id) => {
    try {
        await findScheduleById(id);
        await deleteSchedule(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateSchedule = async (id, payload) => {
    try {
        const schedule = await findScheduleById(id);
        if (!schedule) {
            throw new Error("Jadwal dengan Id tersebut tidak ditemukan");
        }
        await editSchedule(id, payload);
    } catch (error) {
        throw new Error(error.message);
    }
};