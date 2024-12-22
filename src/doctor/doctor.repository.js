//berkomunikasi dengan database
//dapat menggunakan orm atau query raw
//supaya untuk mengganti ORM tinggal ganti pada file ini aja kok

import { prisma } from "../../lib/prisma.js";

export const findAllDoctors = async () => {
    try {
        const doctors = await prisma.doctors.findMany({

        });
        return doctors
    } catch (error) {
        throw new Error("Server Mengalami Gangguan 4");
    }
}

export const findDoctorById = async (id) => {
    try {
        const doctor = await prisma.doctors.findUnique({
            where: { id }
        });
        return doctor;
    } catch (error) {
        throw new Error(error);
    }
}

export const findDoctorByEmail = async (email) => {
    try {
        const doctor = await prisma.doctors.findFirst({
            where: { email }
        });
        return doctor;
    } catch (error) {
        throw new Error("Server Mengalami Gangguan 6");
    }
}

export const insertDoctor = async (data) => {
    try {
        const doctor = await prisma.doctors.create({ data });
        return doctor
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
};

export const deleteDoctor = async (id) => {
    try {
        await prisma.doctors.delete({
            where: { id },
        });
    } catch (error) {
        throw new Error("Server Mengalami Gangguan34");
    }
};

export const editDoctor = async (id, data) => {
    try {
        await prisma.doctors.update({
            where: { id },
            data
        });
    } catch (error) {
        throw new Error(error);
    }
};

