import jwt from 'jsonwebtoken';
import { editUser, findUserByEmail } from '../../user/user.repository.js';
import { compare } from 'bcrypt'
import { editAdmin, findAdminByEmail } from '../../admin/admin.repository.js';

export const loginUser = async (data) => {
    try {
        const { email, password: inputPassword } = data

        let validatedUser = await findUserByEmail(email)
        let role = "user"

        if (!validatedUser || validatedUser.length === 0) {
            validatedUser = await findAdminByEmail(email)
            if (!validatedUser || validatedUser.length === 0) {
                throw new Error("Email tidak ditemukan")
            }
            role = validatedUser.role
        }

        const { password, id, name } = validatedUser

        const isPassword = await compare(inputPassword, password)
        if (!isPassword) {
            throw new Error("Password Salah")
        }

        const accessToken = jwt.sign({ id, name, role, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "20s"
        })
        const refreshToken = jwt.sign({ id, name, role, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        })

        if (role === "user") {
            await editUser(id, { refreshToken })
        } else {
            await editAdmin(id, { refreshToken })
        }
        return { accessToken, refreshToken }

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}