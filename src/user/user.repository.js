//berkomunikasi dengan database
//dapat menggunakan orm atau query raw
//supaya untuk mengganti ORM tinggal ganti pada file ini aja kok

import prisma from "../../lib/prisma.js";

export const findAllUsers = async (skip, limit) => {
    try {
        const users = await prisma.users.findMany({
            skip: skip,
            take: limit,
            select: {
                id: true,
                name: true,
                email: true,
                birthDate: true,
                gender: true,
                location: true,
                phoneNumber: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return users;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan mengambil semua user");
    }
}

export const findUserById = async (id) => {
    try {
        const user = await prisma.users.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                password: true,
                email: true,
                location: true,
                birthDate: true,
                phoneNumber: true,
                gender: true,
                createdAt: true,
                updatedAt: true,
                queues: true,
            },
        });
        return user;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan pencarian user berdasarkan id");
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await prisma.users.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                password: true,
                email: true
            }
        });
        return user;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan pencarian user berdasarkan email");
    }
}

export const findUserByNumber = async (numberKTP, numberBPJS) => {
    try {
        const user = await prisma.users.findUnique({
            where: { numberKTP, numberBPJS },
            select: {
                id: true,
                name: true,
                password: true,
                email: true,
                gender: true,
                birthDate: true,
                phoneNumber: true,
                createdAt: true,
                updatedAt: true,
                queues: true,
            }
        });
        return user;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan pencarian user berdasarkan nomor KTP atau nomor BPJS");
    }
}

export const findUserByRefreshToken = async (refreshToken) => {
    try {
        const user = await prisma.users.findFirst({
            where: { refreshToken },
            select: {
                id: true,
                name: true,
                password: true,
                email: true
            }
        });
        return user;
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan pencarian user berdasarkan token");
    }
}

export const insertUser = async (data) => {
    try {
        await prisma.users.create({
            data
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan dalam penambahan user");
    }
};

export const deleteUser = async (id) => {
    try {
        await prisma.users.delete({
            where: { id },
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan dalam penghapusan user");
    }
};

export const editUser = async (id, data) => {
    try {
        await prisma.users.update({
            where: { id },
            data
        });
    } catch (error) {
        console.log(error)
        throw new Error("Kesalahan dalam mengubah user");
    }
};

