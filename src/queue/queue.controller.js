import express from 'express'
import { createQueue, deleteQueueById, getAllQueue, getQueueById, updateQueue } from './queue.service.js';

const router = express.Router()

//Ambil semua data
router.get("/", async (req, res) => {
    const { status, doctorId, date, time, userId } = req.query
    const parsedDate = date ? new Date(date) : undefined;

    const filters = { status, doctorId, parsedDate, time, userId }

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
        const { userId, doctorId, date, status, time } = req.body;
        if (!userId || !doctorId || !date || !status || !time) {
            throw new Error("Data tidak lengkap")
        }
        const parsedDate = date ? new Date(date) : undefined;
        const now = new Date();
        const maxDate = new Date();
        maxDate.setDate(now.getDate() + 7);

        if (!parsedDate || parsedDate < now || parsedDate > maxDate) {
            throw new Error("Tanggal tidak sesuai")
        }
        const data = { status, doctorId, date: parsedDate, time, userId }
        await createQueue(data)
        res.status(200).json({ message: "Berhasil Menambahkan Antrean" });
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
        await updateQueue(id, payload);
        res.status(200).json({ message: "Berhasil Mengubah Antrean" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router