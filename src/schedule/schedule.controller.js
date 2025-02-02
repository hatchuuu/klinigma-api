import express from 'express'
import { getAllSchedules, getScheduleById, createSchedule, deleteScheduleById, updateSchedule } from './schedule.service.js';
import { z } from 'zod';
const router = express.Router()

//Ambil semua data
router.get("/", async (req, res) => {
    try {
        const data = await getAllSchedules();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Cari data berdasarkan ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getScheduleById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
/**
 * doctorId ,day ,startTime ,endTime ,isHoliday
 */

//Tambah data
router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const { doctorId, day, startTime, endTime } = req.body;
        if (!doctorId || !day || !startTime || !endTime) {
            throw new Error("Data tidak lengkap");
        }
        await createSchedule(req.body)
        res.status(200).json({ message: "Berhasil Menambahkan Jadwal" });
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
        await deleteScheduleById(id);
        res.status(200).json({ message: "Berhasil Menghapus Jadwal" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Ubah data - semua kolom harus terisi
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { doctorId, day, startTime, endTime, isHoliday } = req.body;
        if (!doctorId || !day || !startTime || !endTime || !isHoliday) {
            throw new Error("Data tidak lengkap");
        }
        await updateSchedule(id, req.body);
        res.status(200).json({ message: "Berhasil Mengubah Jadwal" });
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
        await updateSchedule(id, req.body);
        res.status(200).json({ message: "Berhasil Mengubah Jadwal" });
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