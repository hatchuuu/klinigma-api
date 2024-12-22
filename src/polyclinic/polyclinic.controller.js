import express from 'express'
import { getAllPoly, getPolyById } from './polyclinic.service.js';
const router = express.Router()

//Ambil semua data
router.get("/", async (req, res) => {
    try {
        const data = await getAllPoly();
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
        const data = await getPolyById(parseInt(id));
        res.status(200).json(data);
        // res.status(200).json({ status: 200, message: "Berhasil Mengambil Poliklinik Berdasarkan Id", data });
    } catch (error) {
        res.status(400).json({ status: 400, message: error.message });
    }
});

export default router