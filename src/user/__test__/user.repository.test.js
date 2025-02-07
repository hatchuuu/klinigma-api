import prisma from '../../../lib/prisma.js'
import { deleteUser, editUser, findAllUsers, findUserByEmail, findUserById, findUserByNumber, findUserByRefreshToken, insertUser } from '../user.repository.js'

jest.mock('../../../lib/prisma.js', () => ({
    users: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
    },
}))

describe("findAllUsers", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return all users", async () => {
        const mockUsers = [
            {
                id: "id",
                name: "nama",
                email: "email@gmail.com",
                phoneNumber: "08912121212",
                location: "Jakarta",
                gender: "laki-laki",
                birthDate: "2000-01-01T00:00:00.000Z",
                createdAt: "2020-01-01T00:00:00.000Z",
                updatedAt: "2020-01-01T00:00:00.000Z"
            },
            {
                id: "id2",
                name: "nama2",
                email: "email2@gmail.com",
                phoneNumber: "08912121212",
                location: "Bandung",
                gender: "perempuan",
                birthDate: "2000-01-01T00:00:00.000Z",
                createdAt: "2020-01-01T00:00:00.000Z",
                updatedAt: "2020-01-01T00:00:00.000Z"
            },
        ]
        prisma.users.findMany.mockResolvedValue(mockUsers)
        const result = await findAllUsers();
        expect(result).toEqual(mockUsers);
        expect(prisma.users.findMany).toHaveBeenCalledTimes(1);
        expect(prisma.users.findMany).toHaveBeenCalledWith({
            select: {
                id: true,
                name: true,
                email: true,
                birthDate: true,
                location: true,
                gender: true,
                phoneNumber: true,
                createdAt: true,
                updatedAt: true
            }
        })
    })

    it("should throw error when database error in find all users", async () => {
        prisma.users.findMany.mockRejectedValue(new Error("Database error"));
        const result = findAllUsers()
        await expect(result).rejects.toThrow("Kesalahan mengambil semua user");
        expect(prisma.users.findMany).toHaveBeenCalledTimes(1);
    });
})

describe("findUserById", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    it("should return user by id", async () => {
        const mockUser =
        {
            id: "id",
            name: "nama",
            email: "email@gmail.com",
            password: "password",
            location: "Jakarta",
            gender: "laki-laki",
            birthDate: "2000-01-01T00:00:00.000Z",
            phoneNumber: "0891231231",
            imageId: "/image/imageId.png",
            imageSelfie: "/image/imageSelfie.png",
            createdAt: "2020-01-01T00:00:00.000Z",
            updatedAt: "2020-01-01T00:00:00.000Z",
            queues: []
        }
        prisma.users.findUnique.mockResolvedValue(mockUser)
        const result = await findUserById("id");
        expect(result).toEqual(mockUser);
        expect(prisma.users.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.users.findUnique).toHaveBeenCalledWith({
            where: { id: "id" },
            select: {
                id: true,
                name: true,
                password: true,
                email: true,
                location: true,
                gender: true,
                birthDate: true,
                phoneNumber: true,
                imageId: true,
                imageSelfie: true,
                createdAt: true,
                updatedAt: true,
                queues: true,
            },
        })
    })

    it("should return null if user not found by id", async () => {
        prisma.users.findUnique.mockResolvedValue(null);
        const result = await findUserById("non-existent-id")
        expect(result).toBeNull()
        expect(prisma.users.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.users.findUnique).toHaveBeenCalledWith({
            where: { id: "non-existent-id" },
            select: {
                id: true,
                name: true,
                password: true,
                email: true,
                location: true,
                gender: true,
                birthDate: true,
                phoneNumber: true,
                imageId: true,
                imageSelfie: true,
                createdAt: true,
                updatedAt: true,
                queues: true,
            },
        })
    })

    it("should throw error when database error in find user by id", async () => {
        prisma.users.findUnique.mockRejectedValue(new Error("Database error"));
        const result = findUserById("id")
        await expect(result).rejects.toThrow("Kesalahan pencarian user berdasarkan id");
        expect(prisma.users.findUnique).toHaveBeenCalledTimes(1);
    });
})

describe('findUserByEmail', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return user by email', async () => {
        const mockUser =
        {
            id: "id",
            name: "nama",
            email: "email@gmail.com",
            password: "password",
        }
        prisma.users.findUnique.mockResolvedValue(mockUser)
        const result = await findUserByEmail("email@gmail.com");
        expect(result).toEqual(mockUser);
        expect(prisma.users.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.users.findUnique).toHaveBeenCalledWith({
            where: { email: "email@gmail.com" },
            select: {
                id: true,
                name: true,
                password: true,
                email: true,
            },
        })
    })

    it("should return null if user not found by email", async () => {
        prisma.users.findUnique.mockResolvedValue(null);
        const result = await findUserByEmail("non-existent-email")
        expect(result).toBeNull()
        expect(prisma.users.findUnique).toHaveBeenCalledTimes(1);
        expect(prisma.users.findUnique).toHaveBeenCalledWith({
            where: { email: "non-existent-email" },
            select: {
                id: true,
                name: true,
                password: true,
                email: true,
            },
        })
    })

    it("should throw error when database error in find user by email", async () => {
        prisma.users.findUnique.mockRejectedValue(new Error("Database error"));
        const result = findUserByEmail("email")
        await expect(result).rejects.toThrow("Kesalahan pencarian user berdasarkan email");
        expect(prisma.users.findUnique).toHaveBeenCalledTimes(1);
    });
});


describe('findUserByNumber', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });
    it('should return user by number', async () => {
        const mockUser = {
            id: "id",
            name: "nama",
            email: "email@gmail.com",
            password: "password",
            location: "Jakarta",
            gender: "laki-laki",
            birthDate: "2000-01-01T00:00:00.000Z",
            phoneNumber: "0891231231",
            imageId: "/image/imageId.png",
            imageSelfie: "/image/imageSelfie.png",
            createdAt: "2020-01-01T00:00:00.000Z",
            updatedAt: "2020-01-01T00:00:00.000Z",
            queues: []
        }

        prisma.users.findUnique.mockResolvedValue(mockUser)
        const result = await findUserByNumber("nomorKTP", "nomorBPJS")
        expect(result).toEqual(mockUser);
        expect(prisma.users.findUnique).toHaveBeenCalledTimes(1)
        expect(prisma.users.findUnique).toHaveBeenCalledWith({
            where: { numberKTP: "nomorKTP", numberBPJS: "nomorBPJS" },
            select: {
                id: true,
                name: true,
                password: true,
                email: true,
                location: true,
                gender: true,
                birthDate: true,
                phoneNumber: true,
                imageId: true,
                imageSelfie: true,
                createdAt: true,
                updatedAt: true,
                queues: true,
            }
        })
    });

    it('should return null if user not found by number', async () => {
        prisma.users.findUnique.mockResolvedValue(null)
        const result = await findUserByNumber("non-existent-numberKTP", "non-existent-numberBPJS")
        expect(result).toBeNull()
        expect(prisma.users.findUnique).toHaveBeenCalledTimes(1)
        expect(prisma.users.findUnique).toHaveBeenCalledWith({
            where: { numberKTP: "non-existent-numberKTP", numberBPJS: "non-existent-numberBPJS" },
            select: {
                id: true,
                name: true,
                password: true,
                email: true,
                location: true,
                gender: true,
                birthDate: true,
                phoneNumber: true,
                imageId: true,
                imageSelfie: true,
                createdAt: true,
                updatedAt: true,
                queues: true,
            }
        })
    });

    it('should throw error when database error in find user by number', async () => {
        prisma.users.findUnique.mockRejectedValue(new Error("Database Error"))
        await expect(findUserByNumber("numberKTP", "numberBPJS")).rejects.toThrow("Kesalahan pencarian user berdasarkan nomor KTP atau nomor BPJS")
        expect(prisma.users.findUnique).toHaveBeenCalledTimes(1)
    });
});

describe('findUserByRefreshToken', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });
    it('should return user by refresh token', async () => {
        const mockUser =
        {
            id: "id",
            name: "nama",
            password: "password",
            email: "email@gmail.com",
        }

        prisma.users.findFirst.mockResolvedValue(mockUser)
        const result = await findUserByRefreshToken("existent-refresh-token")
        expect(result).toEqual(mockUser);
        expect(prisma.users.findFirst).toHaveBeenCalledTimes(1)
        expect(prisma.users.findFirst).toHaveBeenCalledWith({
            where: { refreshToken: "existent-refresh-token" },
            select: {
                id: true,
                name: true,
                password: true,
                email: true,
            }
        })
    });

    it('should return null if user not found by refresh token', async () => {
        prisma.users.findFirst.mockResolvedValue(null)
        const result = await findUserByRefreshToken("non-existent-refresh-token")
        expect(result).toBeNull()
        expect(prisma.users.findFirst).toHaveBeenCalledTimes(1)
        expect(prisma.users.findFirst).toHaveBeenCalledWith({
            where: { refreshToken: "non-existent-refresh-token" },
            select: {
                id: true,
                name: true,
                password: true,
                email: true,
            }
        })
    });

    it('should throw error when database error in find user by refresh token', async () => {
        prisma.users.findFirst.mockRejectedValue(new Error("Database Error"))
        await expect(findUserByRefreshToken("existent-refresh-token")).rejects.toThrow("Kesalahan pencarian user berdasarkan token")
        expect(prisma.users.findFirst).toHaveBeenCalledTimes(1)
    });
});

describe('insertUser', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });
    it('should create user successfully', async () => {
        const mockUser = {
            name: "nama",
            email: "email@gmail.com",
            password: "hashPassword",
            location: "Jakarta",
            phoneNumber: "08912121212",
            birthDate: "2000-01-01T00:00:00.000Z",
            gender: "laki-laki",
            numberKTP: "1212121",
            numberKK: "121212",
            numberBPJS: "1212121",
            imageId: "/image/imageId.png",
            imageSelfie: "/image/imageSelfie.png",
        }

        prisma.users.create.mockResolvedValue(mockUser)

        await expect(insertUser(mockUser)).resolves.not.toThrow()
        expect(prisma.users.create).toHaveBeenCalledTimes(1)
        expect(prisma.users.create).toHaveBeenCalledWith({ data: mockUser })
    });

    it('should throw error when database error in create user', async () => {
        prisma.users.create.mockRejectedValue(new Error("Database Error"))
        await expect(insertUser({ name: "username" })).rejects.toThrow("Kesalahan dalam penambahan user")
        expect(prisma.users.create).toHaveBeenCalledTimes(1)
    });
});

describe('deleteUser', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });
    it('should delete user successfully', async () => {
        const userId = "123"
        prisma.users.delete.mockResolvedValue({ id: userId })
        await expect(deleteUser(userId)).resolves.not.toThrow()
        expect(prisma.users.delete).toHaveBeenCalledTimes(1)
        expect(prisma.users.delete).toHaveBeenCalledWith({
            where: { id: userId },
        })
    });

    it('should throw error when database error in delete user', async () => {
        const userId = "123"
        prisma.users.delete.mockRejectedValue(new Error("Database Error"))
        await expect(deleteUser(userId)).rejects.toThrow("Kesalahan dalam penghapusan user")
        expect(prisma.users.delete).toHaveBeenCalledTimes(1);
    });
});

describe('editUser', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });
    it('should update user successfully', async () => {
        const userId = "123"
        const mockUser = {
            name: "newName",
            email: "newEmail@gmail.com"
        }

        prisma.users.update.mockResolvedValue({ id: userId, ...mockUser })
        await expect(editUser(userId, mockUser)).resolves.not.toThrow()
        expect(prisma.users.update).toHaveBeenCalledTimes(1);
        expect(prisma.users.update).toHaveBeenCalledWith({
            where: { id: userId },
            data: mockUser
        });
    });

    it('should throw error when database error in update user', async () => {
        const userId = "123"
        const mockUser = {
            name: "newUsername",
            name: "newEmail@gmail.com",
        }
        prisma.users.update.mockRejectedValue(new Error("Database Error"))
        await expect(editUser(userId, mockUser)).rejects.toThrow("Kesalahan dalam mengubah user")
        expect(prisma.users.update).toHaveBeenCalledTimes(1);
    });
});