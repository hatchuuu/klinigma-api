import express from 'express'
import { createDoctor, deleteDoctorById, getAllDoctors, getDoctorById, updateDoctor } from './doctor.service.js';
import { doctorSchema, putDoctorSchema } from '../../lib/zodSchema.js';
import { z } from 'zod';

const router = express.Router()

//Ambil semua data
router.get("/", async (req, res) => {
    try {
        const data = await getAllDoctors();
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
        if (isNaN(parseInt(id))) throw new Error("ID harus berupa angka");
        const data = await getDoctorById(parseInt(id));
        res.status(200).json(data);
        // res.status(200).json({ status: 200, message: "Berhasil Mengambil Dokter Berdasarkan Id", data });
    } catch (error) {
        res.status(400).json({ status: 400, message: error.message });
    }
});

//Tambah data
router.post("/", async (req, res) => {
    try {
        const { polyclinicId, polyName, name, email, descriptions, location, gender, schedules, availableDays } = req.body;
        if (!polyclinicId || !polyName || !name || !email || !descriptions || !location || !gender || !schedules || !availableDays) {
            throw new Error("Data tidak lengkap");
        }
        // const payload = doctorSchema.parse(req.body);
        console.log(req.body)
        await createDoctor(req.body)
        res.status(200).json({ status: 200, message: "Berhasil Menambahkan Dokter" });
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
        if (isNaN(parseInt(id))) throw new Error("ID harus berupa angka");
        await deleteDoctorById(parseInt(id));
        res.status(200).json({ status: 200, message: "Berhasil Menghapus Dokter" });
    } catch (error) {
        res.status(400).json({ status: 400, message: error.message });
    }
});

//Ubah data - semua kolom harus terisi
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(parseInt(id))) throw new Error("ID harus berupa angka");
        const { polyclinicId, polyName, phoneNumber, name, email, descriptions, location, gender, schedules, availableDays } = req.body;
        if (!polyclinicId || !phoneNumber || !polyName || !name || !email || !descriptions || !location || !gender || !schedules || !availableDays) {
            throw new Error("Data tidak lengkap");
        }
        const payload = doctorSchema.parse(req.body);
        await updateDoctor(parseInt(id), payload);
        res.status(200).json({ status: 200, message: "Berhasil Mengubah Dokter" });
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
        console.log(req.body);
        if (isNaN(parseInt(id))) throw new Error("ID harus berupa angka");
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error("Tidak Ada data yang akan diubah");
        }
        const payload = putDoctorSchema.parse(req.body);
        await updateDoctor(parseInt(id), payload);
        res.status(200).json({ status: 200, message: "Berhasil Mengubah Dokter" });
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