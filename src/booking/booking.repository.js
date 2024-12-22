//berkomunikasi dengan database
//dapat menggunakan orm atau query raw
//supaya untuk mengganti ORM tinggal ganti pada file ini aja kok

import { prisma } from "../../lib/prisma.js";

export const findAllBookings = async () => {
    try {
        const bookings = await prisma.bookings.findMany();
        return bookings;
    } catch (error) {
        throw new Error("Server Mengalami Gangguan 1");
    }
}

export const findBookingById = async (id) => {
    try {
        const booking = await prisma.bookings.findUnique({
            where: { id }
        });
        return booking;
    } catch (error) {
        throw new Error(error);
    }
}

export const insertBooking = async (data) => {
    try {
        const booking = await prisma.bookings.create({ data });
        return booking
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteBooking = async (id) => {
    try {
        await prisma.bookings.delete({
            where: { id },
        });
    } catch (error) {
        throw new Error("Server Mengalami Gangguan 3");
    }
};

export const editBooking = async (id, data) => {
    try {
        await prisma.bookings.update({
            where: { id },
            data
        });
    } catch (error) {
        throw new Error("Server Mengalami Gangguan 4");
    }
};

