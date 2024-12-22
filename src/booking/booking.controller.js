import express from 'express'
import { bookingSchema, putBookingSchema, putUserSchema, userSchema } from '../../lib/zodSchema.js';
import { z } from 'zod';
import { createBooking, deleteBookingById, getAllBookings, getBookingById, updateBooking } from './booking.service.js';

const router = express.Router()

//Ambil semua data
router.get("/", async (req, res) => {
    try {
        const data = await getAllBookings();
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
        const data = await getBookingById(parseInt(id));
        res.status(200).json(data);
        // res.status(200).json({ status: 200, message: "Berhasil Mengambil Data", data });
    } catch (error) {
        res.status(400).json({ status: 400, message: error.message });
    }
});

//Tambah data
router.post("/", async (req, res) => {
    try {
        const { polyclinicId, doctorId, userId, name, status, queueNumber, scheduleDay, bookingDate } = req.body;
        if (!polyclinicId || !doctorId || !userId || !name || !status || !queueNumber || !scheduleDay || !bookingDate) {
            throw new Error("Data tidak lengkap")
        }
        const payload = bookingSchema.parse(req.body);
        const booking = await createBooking(payload)
        res.status(200).json(booking);
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
        await deleteBookingById(parseInt(id));
        res.status(200).json({ status: 200, message: "Berhasil Menghapus Booking" });
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
        const { polyclinicId, doctorId, userId, name, status, queueNumber, scheduleDay, bookingDate } = req.body;
        if (!polyclinicId || !doctorId || !userId || !name || !status || !queueNumber || !scheduleDay || !bookingDate) {
            throw new Error("Data tidak lengkap")
        }
        const payload = bookingSchema.parse(req.body);
        await updateBooking(parseInt(id), payload);
        res.status(200).json({ status: 200, message: "Berhasil Mengubah Booking" });
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
        if (isNaN(parseInt(id))) throw new Error("ID harus berupa angka");
        //Buat sebuah kondisi ketika ada kolom yang tidak terisi
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error("Tidak Ada data yang akan diubah");
        }
        const payload = putBookingSchema.parse(req.body)
        await updateBooking(parseInt(id), payload);
        res.status(200).json({ status: 200, message: "Berhasil Mengubah Booking" });
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