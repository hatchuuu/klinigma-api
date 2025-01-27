//functionya re-usable

import { genSalt, hash } from "bcrypt";
import { deleteAdmin, editAdmin, findAllAdmins, findAdminByEmail, findAdminById, insertAdmin } from "./admin.repository.js";

const encryptPassword = async (password) => {
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    return hashPassword;
}
export const getAllAdmins = async () => {
    try {
        const admins = await findAllAdmins();
        return admins;
    } catch (error) {
        throw new Error("Gagal Mengambil Seluruh Data Admin");
    }
};

export const getAdminById = async (id) => {
    try {
        const admin = await findAdminById(id);
        if (!admin) {
            throw new Error("Admin dengan Id tersebut tidak ditemukan");
        }
        return admin;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createAdmin = async (payload) => {
    try {
        const { email, password } = payload;
        const validatedEmail = await findAdminByEmail(email);
        if (validatedEmail) {
            throw new Error("Email sudah terdaftar");
        }
        const hashPassword = await encryptPassword(password);
        const admin = await insertAdmin({ ...payload, password: hashPassword });
        return admin;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteAdminById = async (id) => {
    try {
        await getAdminById(id);
        await deleteAdmin(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateAdmin = async (id, payload) => {
    try {
        const { password } = payload;
        const admin = await findAdminById(id);
        if (!admin) {
            throw new Error("Admin dengan Id tersebut tidak ditemukan");
        }
        const hashPassword = await encryptPassword(password);
        await editAdmin(id, { ...payload, password: hashPassword });
    } catch (error) {
        throw new Error(error.message);
    }
};
