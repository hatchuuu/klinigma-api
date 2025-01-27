import express from 'express'
import { createAdmin, deleteAdminById, getAllAdmins, getAdminById, updateAdmin } from './admin.service.js';
import { z } from 'zod';

const router = express.Router()
//      name, email, password, role 

//Ambil semua data
router.get("/", async (req, res) => {
    try {
        const data = await getAllAdmins();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error)
    }
});

//Cari data berdasarkan ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getAdminById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});

//Tambah data
router.post("/", async (req, res) => {
    try {
        const { name, email, password, role, polyclinicId } = req.body;
        if (!name || !email || !password || !role) {
            throw new Error("Data tidak lengkap");
        }
        if (!polyclinicId && role == "admin") {
            throw new Error("Admin harus memiliki poliklinik")
        }
        await createAdmin(req.body)
        res.status(200).json({ message: "Berhasil Menambahkan Admin" });
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
        await deleteAdminById(id);
        res.status(200).json({ message: "Berhasil Menghapus Admin" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Ubah data - semua kolom harus terisi
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, role, polyclinicId } = req.body;
        if (!name || !email || !password || !role) {
            throw new Error("Data tidak lengkap")
        }
        if (!polyclinicId && role == "admin") {
            throw new Error("Admin harus memiliki poliklinik")
        }
        await updateAdmin(id, req.body);
        res.status(200).json({ message: "Berhasil Mengubah Admin" });
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
        // const payload = putAdminSchema.parse(req.body)
        // await updateAdmin(id, payload);
        await updateAdmin(id, req.body);
        res.status(200).json({ message: "Berhasil Mengubah Admin" });
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