import express from 'express'
import { z } from 'zod';
import upload, { deleteFile } from '../../../utils/multer.js';
import { createUser } from '../../user/user.service.js';
import dayjs from 'dayjs';
import { userSchema } from '../../../lib/zodSchema.js';

const router = express.Router()
//
router.post("/", upload.fields([{ name: "imageId" }, { name: "imageSelfie" }]), async (req, res) => {
    const imageId = req.files.imageId?.[0] || null;
    const imageSelfie = req.files.imageSelfie?.[0] || null;
    try {
        const { name, email, password, confirmPassword, location, birthDate, gender, phoneNumber, numberKTP, numberKK, numberBPJS } = req.body;

        if (!name
            || !email
            || !password
            || !confirmPassword
            || !location
            || !phoneNumber
            || !birthDate
            || !gender
            || !numberKTP
            || !numberKK
            || !numberBPJS
            || !imageId
            || !imageSelfie
        ) {
            throw new Error("Data tidak lengkap");
        }

        const payload = userSchema.parse(req.body)

        const { confirmPassword: unused, ...newPayload } = payload;

        if (password !== confirmPassword) {
            throw new Error("Password tidak sesuai")
        }

        const isoDate = dayjs(birthDate).toISOString();

        await createUser({
            ...newPayload,
            birthDate: isoDate,
        },
            imageId.path,
            imageSelfie.path
        );
        res.status(201).json({ message: "Registrasi Berhasil" });

    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                error: `${error.errors[0].message} - pada kolom ${error.errors[0].path[0]}`,
            });
        } else {
            res.status(400).json({ error: error.message });
        }
        deleteFile(imageId.path);
        deleteFile(imageSelfie.path);
    }
});

export default router