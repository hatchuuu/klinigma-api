import { editAdmin, findAdminByRefreshToken } from "../../admin/admin.repository.js";
import { editUser, findUserByRefreshToken } from "../../user/user.repository.js";

export const deleteRefreshToken = async (refreshToken) => {
    try {
        let role = "user";
        let response = await findUserByRefreshToken(refreshToken);
        if (!response) {
            response = await findAdminByRefreshToken(refreshToken);
            if (!response) {
                throw new Error(204)
            }
            role = response.role
        }

        const { id } = response

        if (role === "user") {
            await editUser(id, { refreshToken: null })
        } else {
            await editAdmin(id, { refreshToken: null })
        }
        return true

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}