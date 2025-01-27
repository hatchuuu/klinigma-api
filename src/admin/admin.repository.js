//berkomunikasi dengan database
//dapat menggunakan orm atau query raw
//supaya untuk mengganti ORM tinggal ganti pada file ini aja kok

import { prisma } from "../../lib/prisma.js";

export const findAllAdmins = async () => {
    try {
        const admins = await prisma.admins.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                polyclinic: {
                    select: {
                        polyclinicName: true,
                    },
                },
            },
        });
        return admins;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan mengambil semua Admin");
    }
}

export const findAdminById = async (id) => {
    try {
        const admin = await prisma.admins.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                password: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                polyclinic: {
                    select: {
                        polyclinicName: true,
                    },
                },
            },
        });
        return admin;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan pencarian Admin berdasarkan id");
    }
}

export const findAdminByEmail = async (email) => {
    try {
        const admin = await prisma.admins.findFirst({
            where: { email },
            select: {
                id: true,
                name: true,
                password: true,
                email: true,
                role: true
            },
        });
        return admin;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan pencarian Admin berdasarkan email");
    }
}
export const findAdminByRefreshToken = async (refreshToken) => {
    try {
        const admin = await prisma.admins.findFirst({
            where: { refreshToken },
            select: {
                id: true,
                name: true,
                password: true,
                email: true
            }
        });
        return admin;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan pencarian admin berdasarkan token");
    }
}

export const insertAdmin = async (data) => {
    try {
        await prisma.admins.create({
            data
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan dalam penambahan Admin");
    }
};

export const deleteAdmin = async (id) => {
    try {
        await prisma.admins.delete({
            where: { id },
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan dalam penghapusan Admin");
    }
};

export const editAdmin = async (id, data) => {
    try {
        await prisma.admins.update({
            where: { id },
            data
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan dalam mengubah Admin");
    }
};

