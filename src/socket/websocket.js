import { Server } from "socket.io";

const socketHandler = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173"],
            methods: ["GET", "POST"],
        }
    });

    console.log(`Socket.IO server running!`);

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);


        socket.on('joinRoom', (polyId) => {
            socket.join(`poly-${polyId}`)
            console.log(`Client ${socket.id} joined room: poly-${polyId}`);
        })

        socket.on('updateQueue', (newQueue) => {
            const { number, polyId } = newQueue
            console.log(`Received number: ${number}, polyId: ${polyId}`);

            try {
                const room = `poly-${polyId}`
                io.to(room).emit('updateQueue', number);
            } catch (error) {
                console.error('Error updating number:', error.message);
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

};

export default socketHandler;
