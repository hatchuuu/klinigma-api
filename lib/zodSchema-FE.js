import { DayContent } from "react-day-picker";
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

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z
      .string({ required_error: "Konfirmasi password dibutuhkan" })
      .min(8, "Minimal 8 Karakter")
      .max(20, "Maksimal 20 Karakter")
      .regex(
        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_])/,
        "Password harus mengandung huruf besar, huruf kecil, angka, dan simbol"
      ),
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
        /^(?:\+62|62|0)8[1-9]\d{6,14}$/,
        "Nomor Telepon tidak valid, gunakan format yang benar. (+62/62/0)"
      ),
    name: z
      .string({ required_error: "Nama dibutuhkan" })
      .min(3, "Minimal 3 Karakter")
      .max(30, "Maksimal 30 Karakter"),
    gender: z.enum(["laki-laki", "perempuan"], {
      required_error: "Jenis Kelamin dibutuhkan",
      message: "Jenis Kelamin tersebut tidak ada"
    }),
    birthDate: z
      .date({
        required_error: "Tanggal lahir dibutuhkan",
        invalid_type_error: "Tanggal Lahir harus berupa angka",
      }).refine((date) => date <= new Date(), {
        message: "Tanggal lahir harus di masa lalu",
      }),
    image: z.custom((file) => {
      if (!(file instanceof File)) {
        return false;
      }

      const allowedMimeTypes = ["image/jpeg", "image/png"];
      if (!allowedMimeTypes.includes(file.type)) {
        return false; // Hanya terima `jpeg` atau `png`
      }

      if (file.size > 2 * 1024 * 1024) {
        return false; // Maksimal 2 MB
      }
      return true;
    }, {
      message: "File harus berupa JPEG/PNG dan berukuran maksimal 2 MB",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sesuai",
    path: ["confirmPassword"],
  });

export const userSchema = registerSchema.extend({
  role: z.enum(["user", "admin", "superadmin"], {
    required_error: "Role dibutuhkan",
    message: "Role tersebut tidak termasuk"
  }).optional(),
})
export const adminSchema = registerSchema.extend({
  role: z.enum(["admin", "superadmin"], {
    required_error: "Role dibutuhkan",
    message: "Role tersebut tidak termasuk"
  }).optional(),
})

export const doctorsSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  gender: z.string().nonempty({ message: "Gender is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  // polyName: z.string().nonempty({ message: "Invalid Poly Name address" }),
  phoneNumber: z
    .string({
      invalid_type_error: "Nomor telepon harus berupa angka",
    })
    .regex(/^\d+$/, { message: "Nomor telepon hanya boleh berisi angka" })
    .min(8, { message: "Minimal 8 digit angka" })
    .max(20, { message: "Maksimal 20 digit angka" }),
  descriptions: z.string().nonempty({ message: "Descriptions are required" }),
  location: z.string().nonempty({ message: "Location is required" }),
  availableDays: z.array(z.string().nonempty({ message: "Available days are required" })), // Memastikan availableDays adalah array string
  // polyclinicId: z.string().nonempty({ message: "Polyclinic ID is required" }),
  schedules: z.array(
    z.object({
      day: z.string().nonempty({ message: "Day is required" }),
      open: z.string().nonempty({ message: "Open time is required" }),
      close: z.string().nonempty({ message: "Close time is required" }),
      quota: z.preprocess((val) => Number(val), z.number().positive()),
    })
  ),
  // image: z
  // .instanceof(File) // Memastikan bahwa input adalah instance dari File
  // .refine((file) => file.type.startsWith('image/'), {
  //     message: "Uploaded file must be an image",
  // })
  // .refine((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024, {
  //     message: File size must be less than ${MAX_FILE_SIZE_MB}MB,
  // })
  // .optional(),
});


// export const doctorsSchema = z.object({
//   name: z.string().nonempty({ message: "Name is required" }),
//   gender: z.string().nonempty({ message: "Gender is required" }),
//   email: z.string().email({ message: "Invalid email address" }),
//   polyName: z.string().email({ message: "Invalid Poly Name address" }),
//   phoneNumber: z
//     .string({
//       invalid_type_error: "Nomor telepon harus berupa angka",
//     })
//     .regex(/^\d+$/, { message: "Nomor telepon hanya boleh berisi angka" })
//     .min(8, { message: "Minimal 8 digit angka" })
//     .max(20, { message: "Maksimal 20 digit angka" }),
//   descriptions: z.string().nonempty({ message: "Descriptions are required" }),
//   location: z.string().nonempty({ message: "Location is required" }),
//   availableDays: z.array(z.string().nonempty({ message: "Available days are required" })), // Memastikan availableDays adalah array string
//   polyclinicId: z.string().nonempty({ message: "Polyclinic ID is required" }),
//   schedules: z.array(
//     z.object({
//       day: z.string().nonempty({ message: "Day is required" }),
//       open: z.string().nonempty({ message: "Open time is required" }),
//       close: z.string().nonempty({ message: "Close time is required" }),
//       quota: z.preprocess((val) => Number(val), z.number().positive()),
//     })
//   ),
//   // image: z
//   // .instanceof(File) // Memastikan bahwa input adalah instance dari File
//   // .refine((file) => file.type.startsWith('image/'), {
//   //     message: "Uploaded file must be an image",
//   // })
//   // .refine((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024, {
//   //     message: `File size must be less than ${MAX_FILE_SIZE_MB}MB`,
//   // })
//   // .optional(),
// });


export const EditUsersSchema = z.object({
  name: z
    .string({ required_error: "Nama dibutuhkan" })
    .min(3, "Minimal 3 Karakter")
    .max(100, "Maksimal 100 Karakter"),
  gender: z
    .string({ required_error: "Jenis Kelamin dibutuhkan" })
    .min(3, { message: "Minimal 3 karakter" })
    .max(20, { message: "Maksimal 20 karakter" }),
  email: z
    .string({ required_error: "Email dibutuhkan" })
    .max(30, "Maksimal 30 Karakter")
    .email("Format Email tidak Valid"),
  location: z
    .string({ required_error: "Asal domisili dibutuhkan" })
    .min(3, "Minimal 3 Karakter")
    .max(200, "Maksimal 200 Karakter"),
  phoneNumber: z
    .string()
    .regex(
      /^(?:\+62|62|0)8[1-9]\d{6,12}$/,
      "Nomor Telepon tidak valid, gunakan format yang benar."
    )
    .min(9, "Nomor Telepon minimal 9 digit")
    .max(15, "Nomor Telepon maksimal 15 digit"),
});
