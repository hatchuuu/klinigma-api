import express from 'express'
import { createUser } from '../../user/user.service';

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error("Data tidak lengkap");
        }
        await createUser(req.body)
        res.status(200).json({ message: "Registrasi Berhasil" });
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