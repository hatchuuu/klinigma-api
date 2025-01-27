//functionya re-usable
import { genSalt, hash } from 'bcrypt'
import { deleteUser, editUser, findAllUsers, findUserByEmail, findUserById, insertUser } from "./user.repository.js";

const encryptPassword = async (password) => {
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    return hashPassword;
}

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
    try {
        const { email, password } = payload;
        const validatedEmail = await findUserByEmail(email);
        if (validatedEmail) {
            throw new Error("Email sudah terdaftar");
        }
        const hashPassword = await encryptPassword(password);
        const user = await insertUser({ ...payload, password: hashPassword });
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
        const { password } = payload;
        const user = await findUserById(id);
        if (!user) {
            throw new Error("User dengan Id tersebut tidak ditemukan");
        }
        const hashPassword = await encryptPassword(password);
        await editUser(id, { ...payload, password: hashPassword });
    } catch (error) {
        throw new Error(error.message);
    }
};
