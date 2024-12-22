import express from 'express'
import { createQueue, deleteQueueById, getAllQueue, getQueueById, updateQueue } from './queue.service.js';

const router = express.Router()

//Ambil semua data
router.get("/", async (req, res) => {
    try {
        const data = await getAllQueue();
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
        const data = await getQueueById(id);
        res.status(200).json(data);
        // res.status(200).json({ status: 200, message: "Berhasil Mengambil Antrean Berdasarkan Id", data });
    } catch (error) {
        res.status(400).json({ status: 400, message: error.message });
    }
});

//Tambah data
router.post("/", async (req, res) => {
    try {
        const { polyclinicId, date, currentQueue } = req.body;
        if (!polyclinicId || !date || !currentQueue) {
            throw new Error("Data tidak lengkap")
        }
        console.log(req.body);
        await createQueue(req.body)
        res.status(200).json({ status: 200, message: "Berhasil Menambahkan Antrean" });
    } catch (error) {

        res.status(400).json({ status: 400, message: error.message });

    }
});

//Hapus data
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await deleteQueueById(id);
        res.status(200).json({ status: 200, message: "Berhasil Menghapus Antrean" });
    } catch (error) {
        res.status(400).json({ status: 400, message: error.message });
    }
});

//Ubah data - semua kolom harus terisi
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(parseInt(id))) throw new Error("ID harus berupa angka");
        //Buat sebuah kondisi ketika ada kolom yang tidak terisi
        const { polyclinicId, date, currentQueue } = req.body;
        if (!polyclinicId || !date || !currentQueue) {
            throw new Error("Data tidak lengkap")
        }
        await updateQueue(parseInt(id), payload);
        res.status(200).json({ status: 200, message: "Berhasil Mengubah Antrean" });
    } catch (error) {

        res.status(400).json({ status: 400, message: error.message });

    }
});

//Ubah data - hanya kolom yang diisi
router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(parseInt(id))) throw new Error("ID harus berupa angka");
        //Buat sebuah kondisi ketika ada kolom yang tidak terisi
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error("Tidak Ada data yang akan diubah");
        }
        await updateQueue(parseInt(id), payload);
        res.status(200).json({ status: 200, message: "Berhasil Mengubah Antrean" });
    } catch (error) {

        res.status(400).json({ status: 400, message: error.message });

    }
});

export default router