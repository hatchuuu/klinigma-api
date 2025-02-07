import { findDoctorById } from "../doctor/doctor.repository.js";
import { findPolyById } from "../polyclinic/polyclinic.repository.js";
import { findAllSchedules, findScheduleById, insertSchedule, deleteSchedule, editSchedule, findScheduleByDoctor } from "./schedule.repository.js";

export const getAllSchedules = async (filters) => {
    try {
        const { doctorId, polyclinicId, time, day } = filters;
        const filter = {}
        if (doctorId) {
            const validatedDoctor = await findDoctorById(doctorId);
            if (!validatedDoctor) throw new Error("Dokter tersebut tidak ditemukan");
            filter["doctorId"] = doctorId
        }
        if (polyclinicId) {
            const validatedPoly = await findPolyById(polyclinicId);
            if (!validatedPoly) throw new Error("Poliklinik tersebut tidak ditemukan");
            filter["polyclinicId"] = polyclinicId
        }

        const schedules = await findAllSchedules({ ...filter, day });

        if (time) {
            const response = schedules.find(s => s.startTime <= time && s.endTime >= time)
            return response
        } else {
            return schedules
        }
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
        const validatedPoly = await findPolyById(payload.polyclinicId);
        if (!validatedPoly) throw new Error("Poliklinik tersebut tidak ditemukan");

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
