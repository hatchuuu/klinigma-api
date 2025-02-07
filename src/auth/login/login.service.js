import jwt from 'jsonwebtoken';
import { editUser, findUserByEmail } from '../../user/user.repository.js';
import { compare } from 'bcrypt'
import { editAdmin, findAdminByEmail } from '../../admin/admin.repository.js';

export const loginUser = async (data) => {
    try {
        const { email, password: inputPassword } = data

        let validatedUser = await findUserByEmail(email)
        let role = "user"
        let polyId = "";

        if (!validatedUser || validatedUser.length === 0) {
            validatedUser = await findAdminByEmail(email)
            if (!validatedUser || validatedUser.length === 0) {
                throw new Error("Email tidak ditemukan")
            }
            polyId = validatedUser.polyclinic.id
            role = validatedUser.role
        }

        const { password, id, name } = validatedUser

        const isPassword = await compare(inputPassword, password)
        if (!isPassword) {
            throw new Error("Password Salah")
        }

        const payload = { id, name, role, email }

        if (role === "admin") {
            payload["polyId"] = polyId
        }

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30s"
        })
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
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