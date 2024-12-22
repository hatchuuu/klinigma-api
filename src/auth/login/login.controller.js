import express from 'express'
import { z } from 'zod';
import { loginSchema } from '../../../lib/zodSchema.js';
import { loginUser } from './login.service.js';

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Data tidak lengkap");
        }
        const loginPayload = loginSchema.parse(req.body);
        const response = await loginUser(loginPayload)
        res.status(200).send({ token: response });
        // res.status(200).json({ status: 200, message: "Login Berhasil", data: { token: response } });
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