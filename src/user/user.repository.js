//berkomunikasi dengan database
//dapat menggunakan orm atau query raw
//supaya untuk mengganti ORM tinggal ganti pada file ini aja kok

import { prisma } from "../../lib/prisma.js";

export const findAllUsers = async () => {
    try {
        const users = await prisma.users.findMany();
        return users;
    } catch (error) {
        throw new Error("Server Terjadi Gangguan 1");
    }
}

export const findUserById = async (id) => {
    try {
        const user = await prisma.users.findUnique({
            where: { id }
        });
        return user;
    } catch (error) {
        throw new Error("Server Terjadi Gangguan 2");
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await prisma.users.findFirst({
            where: { email },
            select: {
                id: true,
                name: true,
                password: true,
                role: true
            }
        });
        return user;
    } catch (error) {
        throw new Error("Server Terjadi Gangguan 3");
    }
}

export const insertUser = async (data) => {
    try {
        await prisma.users.create({
            data: { ...data, updatedAt: new Date() }
        });
    } catch (error) {
        throw new Error("Server Terjadi Gangguan 4");
    }
};

export const deleteUser = async (id) => {
    try {
        await prisma.users.delete({
            where: { id },
        });
    } catch (error) {
        throw new Error("Server Terjadi Gangguan 5");
    }
};

export const editUser = async (id, data) => {
    try {
        await prisma.users.update({
            where: { id },
            data: { ...data, updatedAt: new Date() }
        });
    } catch (error) {
        throw new Error("Server Terjadi Gangguan 6");
    }
};

