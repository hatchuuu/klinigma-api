//functionya re-usable

import { deleteUser, editUser, findAllUsers, findUserByEmail, findUserById, insertUser } from "./user.repository.js";

export const getAllUsers = async () => {
    try {
        const users = await findAllUsers();
        return users;
    } catch (error) {
        throw new Error("Gagal Mengambil Seluruh Data User");
    }
};

export const getUserById = async (id) => {
    try {
        const user = await findUserById(id);
        if (!user) {
            throw new Error("User dengan Id tersebut tidak ditemukan");
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createUser = async (payload) => {
    //validasi apakah nama produk sudah ada
    try {
        const validatedEmail = await findUserByEmail(payload.email);
        if (validatedEmail) {
            throw new Error("Email sudah terdaftar");
        }
        const newPayload = {
            ...payload,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const user = await insertUser(newPayload);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteUserById = async (id) => {
    try {
        await getUserById(id);
        await deleteUser(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateUser = async (id, payload) => {
    try {
        const user = await findUserById(id);
        if (!user) {
            throw new Error("User dengan Id tersebut tidak ditemukan");
        }
        const newPayload = {
            ...payload, updatedAt: new Date()
        }
        await editUser(id, newPayload);
    } catch (error) {
        throw new Error(error.message);
    }
};
