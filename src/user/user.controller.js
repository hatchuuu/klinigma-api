import express from 'express'
import { createUser, deleteUserById, getAllUsers, getUserById, updateUser } from './user.service.js';
import { z } from 'zod';
import { userSchema } from '../../lib/zodSchema.js';
import dayjs from 'dayjs';

const router = express.Router()

//Ambil semua data
router.get("/", async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const filters = { page, limit };
        const data = await getAllUsers(filters);

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});

//Cari data berdasarkan ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const data = await getUserById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});

//Tambah data
router.post("/", async (req, res) => {
    try {
        const { name, email, password, confirmPassword, location, birthDate, gender, phoneNumber, numberKTP, numberKK, numberBPJS } = req.body;

        if (!name
            || !email
            || !password
            || !confirmPassword
            || !location
            || !phoneNumber
            || !birthDate
            || !gender
            || !numberKTP
            || !numberKK
            || !numberBPJS
        ) {
            throw new Error("Data tidak lengkap");
        }

        const payload = userSchema.parse(req.body)

        const { confirmPassword: unused, ...newPayload } = payload;

        if (password !== confirmPassword) {
            throw new Error("Password tidak sesuai")
        }

        const isoDate = dayjs(birthDate).toISOString();

        await createUser({
            ...newPayload,
            birthDate: isoDate,
        });
        res.status(201).json({ message: "Berhasil menambahkan user" });

    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                error: `${error.errors[0].message} - pada kolom ${error.errors[0].path[0]}`,
            });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
});


//Hapus data
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await deleteUserById(id);
        res.status(200).json({ message: "Berhasil Menghapus User" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Ubah data - semua kolom harus terisi
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error("Data tidak lengkap")
        }
        await updateUser(id, req.body);
        res.status(200).json({ message: "Berhasil Mengubah User" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                error: `${error.errors[0].message} - pada kolom ${error.errors[0].path[0]}`,
            });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
});

//Ubah data - hanya kolom yang diisi
router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        //Buat sebuah kondisi ketika ada kolom yang tidak terisi
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error("Tidak Ada data yang akan diubah");
        }
        await updateUser(id, req.body);
        res.status(200).json({ message: "Berhasil Mengubah User" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                error: `${error.errors[0].message} - pada kolom ${error.errors[0].path[0]}`,
            });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
});

export default router