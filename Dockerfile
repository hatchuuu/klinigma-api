# Menggunakan image Node.js sebagai base image
# 18 adalah versi node yang dipakai
# alpine adalah tag node yang dipakai
FROM node:18-alpine

# Menentukan working directory di dalam container
WORKDIR /usr/src/app

# Menyalin package.json dan package-lock.json untuk install dependensi
COPY package.json package-lock.json /app/

# Menginstall dependensi
RUN npm install

# Menyalin seluruh file dari proyek lokal ke dalam container
COPY . .

# Menyediakan port untuk aplikasi
EXPOSE 3002

# Jalankan Express server
CMD ["npm", "start"]
