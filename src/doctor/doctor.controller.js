import express from 'express'
import { createDoctor, deleteDoctorById, getAllDoctors, getDoctorById, updateDoctor } from './doctor.service.js';
import { z } from 'zod';

const router = express.Router()

//Ambil semua data
router.get("/", async (req, res) => {
    try {
        let { polyclinicId, page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const filters = { polyclinicId, page, limit }
        const data = await getAllDoctors(filters);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ status: 400, message: error.message });
    }
});

//Cari data berdasarkan ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getDoctorById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


/**
 * name           String
  polyclinic     Polyclinics       @relation(fields: [polyclinicId], references: [id])
  polyclinicId   String
  polyclinicName String
  name, polyclinicId, polyclinicName
 */
//Tambah data
router.post("/", async (req, res) => {
    try {
        const { name, polyclinicId, email } = req.body;
        if (!name || !polyclinicId || !email) {
            throw new Error("Data tidak lengkap");
        }
        await createDoctor(req.body)
        res.status(200).json({ message: "Berhasil Menambahkan Dokter" });
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
        await deleteDoctorById(id);
        res.status(200).json({ message: "Berhasil Menghapus Dokter" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Ubah data - semua kolom harus terisi
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { name, polyclinicId, email } = req.body;
        if (!name || !polyclinicId || !email) {
            throw new Error("Data tidak lengkap");
        }
        await updateDoctor(id, req.body);
        res.status(200).json({ message: "Berhasil Mengubah Dokter" });
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
        await updateDoctor(id, req.body);
        res.status(200).json({ message: "Berhasil Mengubah Dokter" });
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