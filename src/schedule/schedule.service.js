import { findDoctorById } from "../doctor/doctor.repository.js";
import { findAllSchedules, findScheduleById, insertSchedule, deleteSchedule, editSchedule, findScheduleByDoctor } from "./schedule.repository.js";

export const getAllSchedules = async (filters) => {
    try {
        const { doctorId } = filters;
        const validatedDoctor = await findDoctorById(doctorId);
        if (!validatedDoctor) throw new Error("Dokter tersebut tidak ditemukan");

        const schedules = await findAllSchedules(filters);
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
        const doctorSchedule = await findScheduleByDoctor(payload.doctorId);
        const existingDay = doctorSchedule.find(data => data.day === payload.day);

        if (existingDay) {
            const response = await updateSchedule(existingDay.id, payload)
            return response
        } else {
            const response = await insertSchedule(payload);
            return response;
        }
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
