import express from 'express'
import { getAllPoly, getPolyById, createPoly, deletePolyById, updatePoly } from './polyclinic.service.js';
import { z } from 'zod';
const router = express.Router()

//Ambil semua data
router.get("/", async (req, res) => {
    try {
        const { page, limit } = req.query
        const filters = {
            page: parseInt(page),
            limit: parseInt(limit)
        }
        const data = await getAllPoly(filters);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Cari data berdasarkan ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getPolyById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// polyclinicName, descriptions  

//Tambah data
router.post("/", async (req, res) => {
    try {
        const { polyclinicName, descriptions } = req.body;
        if (!polyclinicName || !descriptions) {
            throw new Error("Data tidak lengkap");
        }
        await createPoly(req.body)
        res.status(200).json({ message: "Berhasil Menambahkan Poliklinik" });
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
        await deletePolyById(id);
        res.status(200).json({ message: "Berhasil Menghapus Poliklinik" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Ubah data - semua kolom harus terisi
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { polyclinicName, descriptions } = req.body;
        if (!polyclinicName || !descriptions) {
            throw new Error("Data tidak lengkap");
        }
        await updatePoly(id, req.body);
        res.status(200).json({ message: "Berhasil Mengubah Poliklinik" });
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
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error("Tidak Ada data yang akan diubah");
        }
        await updatePoly(id, req.body);
        res.status(200).json({ message: "Berhasil Mengubah Poliklinik" });
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