import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import rateLimit from 'express-rate-limit'
import helmet from 'helmet';
// import http from 'http'
import cookieParser from 'cookie-parser';

//controllers
import userController from './user/user.controller.js'
import adminController from './admin/admin.controller.js'
import queueController from './queue/queue.controller.js'
import doctorController from './doctor/doctor.controller.js'
import scheduleController from './schedule/schedule.controller.js'
import polyController from './polyclinic/polyclinic.controller.js'

//authentications
import loginController from './auth/login/login.controller.js'
import refreshToken from './auth/refresh-token/refresh.controller.js'
import logoutController from './auth/logout/logout.controller.js'
import registerController from './auth/register/register.controller.js'

// middlewares
import verifyToken from './middleware/verify.token.js';

//socket
// import handleSocket from './socket/websocket.js'

dotenv.config()

const app = express()
// const server = http.createServer(app)
const PORT = process.env.PORT || 3000

//Rate Limiter
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     message: "Terlalu banyak permintaan, coba lagi.",
// });

app.use(express.json());
app.use(cors(
    {
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
));
// app.use(limiter);
app.use(helmet());
app.use(cookieParser());

//Socket
app.get('/', (_, res) => {
    res.send('Selamat datang di klinigma API \n' +
        "\n" +
        "API Documentation: https://www.github.com/hatchuuu/klinigma-api");
});

// handleSocket(server)

//Routes
app.use('/api/auth/login', loginController)
app.use('/api/auth/register', registerController)
app.use('/api/auth/refresh-token', refreshToken)
app.use('/api/auth/logout', logoutController)
app.use('/api/v1/users', verifyToken, userController)
app.use('/api/v1/admins', verifyToken, adminController)
app.use('/api/v1/doctors', verifyToken, doctorController)
app.use('/api/v1/polyclinics', verifyToken, polyController)
app.use('/api/v1/queues', verifyToken, queueController)
app.use('/api/v1/schedules', verifyToken, scheduleController)

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`))