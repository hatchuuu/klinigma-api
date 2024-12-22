import express from 'express'
import { createUser, deleteUserById, getAllUsers, getUserById, updateUser } from './user.service.js';
import { putUserSchema, userSchema } from '../../lib/zodSchema.js';
import { z } from 'zod';

const router = express.Router()

//Ambil semua data
router.get("/", async (req, res) => {
    try {
        const data = await getAllUsers();
        res.status(200).json(data);
        // res.status(200).json({ status: 200, message: "Berhasil Mengambil Data", data });
    } catch (error) {
        res.status(400).json({ status: 400, message: error.message });
    }
});

//Cari data berdasarkan ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getUserById(id);
        res.status(200).json(data);
        // res.status(200).json({ status: 200, message: "Berhasil Mengambil User Berdasarkan Id", data });
    } catch (error) {
        res.status(400).json({ status: 400, message: error.message });
    }
});

//Tambah data
router.post("/", async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password, location, phoneNumber, gender, birthDate } = req.body;
        if (!name || !email || !password || !location || !phoneNumber || !gender || !birthDate) {
            throw new Error("Data tidak lengkap");
        }
        const payloadUser = userSchema.parse(req.body);
        await createUser(payloadUser)
        res.status(200).json({ status: 200, message: "Berhasil Menambahkan User" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                status: 400,
                message: `${error.errors[0].message} - pada kolom ${error.errors[0].path[0]}`,
            });
        } else {
            res.status(400).json({ status: 400, message: error.message });
        }
    }
});

//Hapus data
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await deleteUserById(id);
        res.status(200).json({ status: 200, message: "Berhasil Menghapus User" });
    } catch (error) {
        res.status(400).json({ status: 400, message: error.message });
    }
});

//Ubah data - semua kolom harus terisi
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        //Buat sebuah kondisi ketika ada kolom yang tidak terisi
        const { name, email, password, location, phoneNumber, gender, birthDate } = req.body;
        if (!name || !email || !password || !location || !phoneNumber || !gender || !birthDate) {
            throw new Error("Data tidak lengkap")
        }
        const payload = userSchema.parse(req.body);
        await updateUser(id, payload);
        res.status(200).json({ status: 200, message: "Berhasil Mengubah User" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                status: 400,
                message: `${error.errors[0].message} - pada kolom ${error.errors[0].path[0]}`,
            });
        } else {
            res.status(400).json({ status: 400, message: error.message });
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
        const payload = putUserSchema.parse(req.body)
        await updateUser(id, payload);
        res.status(200).json({ status: 200, message: "Berhasil Mengubah User" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                status: 400,
                message: `${error.errors[0].message} - pada kolom ${error.errors[0].path[0]}`,
            });
        } else {
            res.status(400).json({ status: 400, message: error.message });
        }
    }
});

export default router