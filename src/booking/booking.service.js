//functionya re-usable

import { deleteBooking, editBooking, findAllBookings, findBookingById, insertBooking } from "./booking.repository.js";


export const getAllBookings = async () => {
    try {
        const bookings = await findAllBookings();
        return bookings;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getBookingById = async (id) => {
    try {
        const booking = await findBookingById(id);
        if (!booking) {
            throw new Error("Booking dengan Id tersebut tidak ditemukan");
        }
        return booking;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createBooking = async (payload) => {
    //validasi apakah nama produk sudah ada
    try {
        const newBooking = {
            ...payload,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const booking = await insertBooking(newBooking);
        return booking;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteBookingById = async (id) => {
    try {
        await getBookingById(id);
        await deleteBooking(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateBooking = async (id, payload) => {
    try {
        const booking = await findBookingById(id);
        if (!booking) {
            throw new Error("Booking dengan Id tersebut tidak ditemukan");
        }
        const newPayload = {
            ...payload,
            updatedAt: new Date()
        }
        await editBooking(id, newPayload);
    } catch (error) {
        throw new Error(error.message);
    }
};
