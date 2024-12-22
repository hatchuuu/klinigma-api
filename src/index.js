import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import userController from './user/user.controller.js'
import doctorController from './doctor/doctor.controller.js'
import bookingController from './booking/booking.controller.js'
import polyController from './polyclinic/polyclinic.controller.js'
import queueController from './queue/queue.controller.js'
import loginController from './auth/login/login.controller.js'
import handleSocket from './socket/websocket.js'

dotenv.config()

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server berjalan dengan Express dan Socket.IO');
});

handleSocket(server)




// 

//USER
app.use('/users', userController)

//DOCTOR
app.use('/doctors', doctorController)

//BOOKINGG
app.use('/bookings', bookingController)

//LOGIN
app.use('/login', loginController)

//POLICLINIC
app.use('/polyclinics', polyController)

//QUEUES
app.use('/queues', queueController)

server.listen(PORT, () => console.log(`Server Running On Port ${PORT}`))