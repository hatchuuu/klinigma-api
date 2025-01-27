//berkomunikasi dengan database
//dapat menggunakan orm atau query raw
//supaya untuk mengganti ORM tinggal ganti pada file ini aja kok

import { prisma } from "../../lib/prisma.js";

export const findAllDoctors = async () => {
    try {
        const doctors = await prisma.doctors.findMany();
        return doctors
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan mengambil semua dokter");
    }
}

export const findDoctorById = async (id) => {
    try {
        const doctor = await prisma.doctors.findUnique({
            where: { id },
            include: {
                schedules: true,
                queues: true
            }
        });
        return doctor;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan mengambil dokter berdasarkan ID");
    }
}

export const findDoctorByEmail = async (email) => {
    try {
        const doctor = await prisma.doctors.findFirst({
            where: { email }
        });
        return doctor;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan mengambil dokter berdasarkan email");
    }
}

export const insertDoctor = async (data) => {
    console.log(data)
    try {
        const doctor = await prisma.doctors.create({ data });
        return doctor
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan saat menambahkan dokter");
    }
};

export const deleteDoctor = async (id) => {
    try {
        await prisma.doctors.delete({
            where: { id },
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan menghapus dokter");
    }
};

export const editDoctor = async (id, data) => {
    try {
        await prisma.doctors.update({
            where: { id },
            data
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan saat mengubah dokter");
    }
};

