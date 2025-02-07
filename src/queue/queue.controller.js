import express from 'express'
import { createQueue, deleteQueueById, getAllQueue, getQueueById, updateQueue } from './queue.service.js';
import dayjs from 'dayjs';

const router = express.Router()

router.get("/", async (req, res) => {
    const { status, doctorId, date, time, userId, polyclinicId, sort, page = 1, limit = 10 } = req.query
    const parsedDate = date ? new Date(date) : undefined;

    const filters = {
        status,
        doctorId,
        sort,
        time,
        userId,
        polyclinicId,
        date: parsedDate,
        page: parseInt(page),
        limit: parseInt(limit)
    }
    try {
        const data = await getAllQueue(filters);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Cari data berdasarkan ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getQueueById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Tambah data
router.post("/", async (req, res) => {
    try {
        const { userId, doctorId, date } = req.body;
        if (!userId || !doctorId || !date) {
            throw new Error("Data tidak lengkap")
        }

        const parsedDate = dayjs(date, "DD-MM-YYYY", true);
        if (!parsedDate.isValid()) {
            throw new Error("Format tanggal harus DD-MM-YYYY");
        }

        const today = dayjs().startOf("day");
        const maxDate = today.add(7, "day");

        if (parsedDate.isBefore(today)) {
            throw new Error("Tanggal tidak boleh kurang dari hari ini");
        }
        if (parsedDate.isAfter(maxDate)) {
            throw new Error("Tanggal tidak boleh lebih dari 7 hari dari sekarang");
        }

        const data = { doctorId, date, userId }
        await createQueue(data)
        res.status(201).json({ message: "Berhasil Menambahkan Antrean" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Hapus data
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await deleteQueueById(id);
        res.status(200).json({ message: "Berhasil Menghapus Antrean" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Ubah data - semua kolom harus terisi
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { userId, doctorId, date, queueNumber } = req.body;
        if (!userId || !doctorId || !date || !queueNumber) {
            throw new Error("Data tidak lengkap")
        }
        await updateQueue(id, payload);
        res.status(200).json({ message: "Berhasil Mengubah Antrean" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Ubah data - hanya kolom yang diisi
router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error("Tidak Ada data yang akan diubah");
        }
        await updateQueue(id, req.body);
        res.status(200).json({ message: "Berhasil Mengubah Antrean" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router