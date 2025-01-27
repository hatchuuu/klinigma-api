import jwt from 'jsonwebtoken';
import { findAdminByRefreshToken } from '../../admin/admin.repository.js';
import { findUserByRefreshToken } from '../../user/user.repository.js';

export const verifyRefreshToken = async (refreshToken) => {
    try {
        let role = "user";
        let response = await findUserByRefreshToken(refreshToken);
        if (!response) {
            response = await findAdminByRefreshToken(refreshToken);
            if (!response) {
                throw new Error(401)
            }
            role = response.role
        }

        return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                throw new Error(403)
            }
            const { id, name, email } = response
            const accessToken = jwt.sign({ id, name, role, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "15s"
            })
            return accessToken
        })
    } catch (error) {
        throw new Error(error.message)
    }
}