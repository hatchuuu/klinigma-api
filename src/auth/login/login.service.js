import pkg from 'jsonwebtoken';
import { findUserByEmail } from '../../user/user.repository.js';

export const loginUser = async (data) => {
    try {
        const { email, password: inputPassword } = data
        const validatedEmail = await findUserByEmail(email)
        if (!validatedEmail || validatedEmail.length === 0) {
            throw new Error("Email tidak ditemukan")
        }
        const { password, id, name, role } = validatedEmail

        if (inputPassword !== password) {
            throw new Error("Password Salah")
        }
        const accessToken = pkg.sign({ id, name, role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1d"
        })
        return accessToken

    } catch (error) {
        throw new Error(error.message)
    }
}