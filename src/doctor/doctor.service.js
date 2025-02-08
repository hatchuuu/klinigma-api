//functionya re-usable

import { findPolyById } from "../polyclinic/polyclinic.repository.js";
import { findAllSchedules } from "../schedule/schedule.repository.js";
import { updateSchedule } from "../schedule/schedule.service.js";
import { findAllDoctors, findDoctorById, findDoctorByEmail, insertDoctor, deleteDoctor, editDoctor } from "./doctor.repository.js";

export const getAllDoctors = async (filters) => {
    try {
        const { polyclinicId, limit, page } = filters;
        const skip = (page - 1) * limit
        if (polyclinicId) {
            const validatedPoly = await findPolyById(polyclinicId);
            if (!validatedPoly) {
                throw new Error("Poliklinik tidak ditemukan");
            }
        }
        const doctors = await findAllDoctors({ polyclinicId }, skip, limit);
        return doctors;
    } catch (error) {
        throw new Error("Gagal Mengambil Seluruh Data Dokter");
    }
};

export const getDoctorById = async (id) => {
    try {
        const doctor = await findDoctorById(id);
        if (!doctor) {
            throw new Error("Dokter dengan Id tersebut tidak ditemukan");
        }
        return doctor;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createDoctor = async (payload) => {
    try {
        const validatedEmail = await findDoctorByEmail(payload.email);
        if (validatedEmail) {
            throw new Error("Email sudah terdaftar");
        }
        const { polyclinicName } = await findPolyById(payload.polyclinicId);
        await insertDoctor({ ...payload, polyclinicName });
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteDoctorById = async (id) => {
    try {
        await getDoctorById(id);
        await deleteDoctor(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateDoctor = async (id, payload) => {
    try {
        const doctor = await findDoctorById(id);
        if (!doctor) {
            throw new Error("Dokter dengan Id tersebut tidak ditemukan");
        }
        await editDoctor(id, payload);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateScheduleByDoctor = async (doctorId, payload, count = -1) => {
    try {
        const { day } = payload;
        const validatedDoctor = await findAllSchedules({ doctorId });
        validatedDoctor.forEach(data => {
            if (data.day == day) {
                if (data.quota > 0) {
                    return updateSchedule(data.id, { quota: data.quota + count })
                }
                throw new Error("Jadwal Dokter pada hari tersebut sudah penuh");
            }
        })
    } catch (error) {
        throw new Error(error.message);
    }
};