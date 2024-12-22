//functionya re-usable

import { findAllDoctors, findDoctorById, findDoctorByEmail, insertDoctor, deleteDoctor, editDoctor } from "./doctor.repository.js";

export const getAllDoctors = async () => {
    try {
        const doctors = await findAllDoctors();
        return doctors;
    } catch (error) {
        throw new Error("Gagal Mengambil Seluruh Data Dokter");
    }
};

export const getDoctorById = async (id) => {
    try {
        const user = await findDoctorById(id);
        if (!user) {
            throw new Error("User dengan Id tersebut tidak ditemukan");
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createDoctor = async (payload) => {
    //validasi apakah nama data sudah ada
    try {
        const validatedEmail = await findDoctorByEmail(payload.email);
        if (validatedEmail) {
            throw new Error("Email sudah terdaftar");
        }
        const newPayload = {
            ...payload,
            image: "https://imagedelivery.net/LBWXYQ-XnKSYxbZ-NuYGqQ/99c1bbdc-6cfa-46ac-7d32-49f449d92600/avatarhd",
            createdAt: new Date()
        }
        await insertDoctor(newPayload);
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
        console.log({ payload });
        const doctor = await findDoctorById(id);
        if (!doctor) {
            throw new Error("Dokter dengan Id tersebut tidak ditemukan");
        }
        await editDoctor(id, payload);
    } catch (error) {
        throw new Error(error.message);
    }
};
