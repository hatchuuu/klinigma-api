import { z } from "zod";
export const loginSchema = z.object({
    email: z
        .string({ required_error: "Email dibutuhkan" })
        .max(30, "Maksimal 30 Karakter")
        .email("Format Email tidak Valid"),
    password: z
        .string({ required_error: "Password dibutuhkan" })
        .min(8, "Minimal 8 Karakter")
        .max(20, "Maksimal 20 Karakter")
        .regex(
            /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_])/,
            "Password harus mengandung huruf besar, huruf kecil, angka, dan simbol"
        ),
});

export const userSchema = loginSchema
    .extend({
        location: z
            .string({ required_error: "Lokasi dibutuhkan" })
            .min(3, "Minimal 3 Karakter")
            .max(30, "Maksimal 30 Karakter"),
        phoneNumber: z
            .string({
                invalid_type_error: "Nomor telepon harus berupa angka",
            })
            .min(8, { message: "Minimal 8 digit angka" })
            .max(20, { message: "Maksimal 20 digit angka" })
            .regex(
                /^(?:\+62|62|0)8[1-9]\d{6,12}$/,
                "Nomor Telepon tidak valid, gunakan format yang benar."
            ),
        name: z
            .string({ required_error: "Nama dibutuhkan" })
            .min(3, "Minimal 3 Karakter")
            .max(30, "Maksimal 30 Karakter"),
        gender: z.enum(["Wanita", "Pria", "wanita", "pria"], {
            required_error: "Gender dibutuhkan",
            message: "Gender tersebut Tidak Termasuk"
        }),
        role: z.enum(["user", "admin-1", "admin-2", "admin-3", "admin-4", "superadmin"], {
            required_error: "Role dibutuhkan",
            message: "Gender tersebut Tidak Termasuk",
        }),
        birthDate: z
            .string({
                invalid_type_error: "Tanggal Lahir harus berupa angka",
            })
            .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Format Tanggal Lahir Keliru" })
            .min(8, "Tanggal Lahir belum lengkap"),
    })


const scheduleSchema = z.object({
    day: z.string({ message: "Itu Bukan Termasuk Hari" }).optional(),
    open: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Waktu mulai tidak valid")
        .optional(),
    close: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Waktu selesai tidak valid")
        .optional(),
    quota: z.preprocess((val) => Number(val), z.number(), { message: "Minimal 1" }).optional(),
    booked: z.preprocess((val) => Number(val), z.number(), { message: "Minimal 1" }).optional(),
})

export const doctorSchema = z.object({
    polyclinicId: z
        .preprocess((val) => Number(val), z
            .number()
            .positive(),
            { message: "Minimal 1" }),
    name: z
        .string({ required_error: "Nama dibutuhkan" })
        .min(3, "Minimal 3 Karakter")
        .max(100, "Maksimal 100 Karakter"),
    polyName: z
        .string({ required_error: "Nama Poli dibutuhkan" })
        .min(3, "Minimal 3 Karakter")
        .max(100, "Maksimal 100 Karakter"),
    gender: z.enum(["Wanita", "Pria", "wanita", "pria"], {
        required_error: "Gender dibutuhkan",
        message: "Gender tersebut Tidak Termasuk"
    }),
    email: z
        .string({ required_error: "Email dibutuhkan" })
        .max(30, "Maksimal 30 Karakter")
        .email("Format Email tidak Valid"),
    descriptions: z
        .string({ required_error: "Deskripsi dibutuhkan" })
        .min(3, "Minimal 3 Karakter")
        .max(200, "Maksimal 200 Karakter"),
    location: z
        .string({ required_error: "Asal domisili dibutuhkan" })
        .min(3, "Minimal 3 Karakter")
        .max(200, "Maksimal 200 Karakter"),
    schedules: z.array(scheduleSchema),
    availableDays: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "Kamu harus mengisi minimal 1 hari",
    }),
});


export const bookingSchema = z.object({
    polyclinicId: z.preprocess((val) => Number(val), z.number().positive(), { message: "Minimal 1" }),
    doctorId: z.preprocess((val) => Number(val), z.number().positive(), { message: "Minimal 1" }),
    userId: z.string(),
    name: z
        .string({ required_error: "Nama dibutuhkan" })
        .min(3, "Minimal 3 Karakter")
        .max(30, "Maksimal 30 Karakter"),
    status: z.enum(["Waiting", "Approved", "Completed", "Canceled"], {
        required_error: "Status dibutuhkan",
        message: "Itu Bukan Termasuk Pilihan",
    }),
    queueNumber: z.preprocess((val) => Number(val), z.number().positive(), { message: "Minimal 1" }),
    scheduleDay: z.enum(["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"], {
        required_error: "Hari dibutuhkan",
        message: "Itu Bukan Termasuk Hari",
    }),
    bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Format Booking Keliru" }),
})

export const putUserSchema = userSchema.partial();
export const putDoctorSchema = doctorSchema.partial();
export const putBookingSchema = bookingSchema.partial();