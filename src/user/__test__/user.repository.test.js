import { prisma } from "../../../lib/prisma.js";
import {
    findAllUsers,
    findUserById,
    findUserByEmail,
    insertUser,
    deleteUser,
    editUser,
} from "../user.repository.js";

jest.mock("../../../lib/prisma.js", () => {
    return {
        prisma: {
            users: {
                findMany: jest.fn(),
                findUnique: jest.fn(),
                findFirst: jest.fn(),
                create: jest.fn(),
                delete: jest.fn(),
                update: jest.fn(),
            },
        }
    }
}
);

describe("Users Service", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Reset all mock calls after each test
    });

    test("should retrieve all users", async () => {
        const mockUsers = [{ id: "1", name: "John Doe" }];
        prisma.users.findMany.mockResolvedValue(mockUsers);

        const users = await findAllUsers();
        expect(users).toEqual(mockUsers);
        expect(prisma.users.findMany).toHaveBeenCalledTimes(1);
    });

    test("should retrieve a user by ID", async () => {
        const mockUser = { id: "1", name: "John Doe", queues: [] };
        prisma.users.findUnique.mockResolvedValue(mockUser);

        const user = await findUserById("1");
        expect(user).toEqual(mockUser);
        expect(prisma.users.findUnique).toHaveBeenCalledWith({
            where: { id: "1" },
            include: { queues: true },
        });
    });

    test("should retrieve a user by email", async () => {
        const mockUser = { id: "1", name: "John Doe", email: "john@example.com" };
        prisma.users.findFirst.mockResolvedValue(mockUser);

        const user = await findUserByEmail("john@example.com");
        expect(user).toEqual(mockUser);
        expect(prisma.users.findFirst).toHaveBeenCalledWith({
            where: { email: "john@example.com" },
        });
    });

    test("should insert a new user", async () => {
        const mockData = { name: "John Doe", email: "john@example.com" };
        prisma.users.create.mockResolvedValue();

        await insertUser(mockData);
        expect(prisma.users.create).toHaveBeenCalledWith({ data: mockData });
    });

    test("should delete a user by ID", async () => {
        prisma.users.delete.mockResolvedValue();

        await deleteUser("1");
        expect(prisma.users.delete).toHaveBeenCalledWith({
            where: { id: "1" },
        });
    });

    test("should update a user by ID", async () => {
        const mockData = { name: "Updated User" };
        prisma.users.update.mockResolvedValue();

        await editUser("1", mockData);
        expect(prisma.users.update).toHaveBeenCalledWith({
            where: { id: "1" },
            data: mockData,
        });
    });
});
