import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
  Server
} = require("socket.io");
const io = new Server(server);

const authRouter = require('./Routes/auth');
const userRouter = require('./Routes/user');
const statusRouter = require('./Routes/status');
const likeRouter = require('./Routes/like');
const commentRouter = require('./Routes/comment');
const friendRouter = require('./Routes/friend');

dotenv.config()

//db connection
mongoose.connect(
  process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

// Middleware
app.use(express.json());
app.use(cors({
  credentials: 'same-origin'
}));

app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', statusRouter);
app.use('/api', likeRouter);
app.use('/api', commentRouter);
app.use('/api', friendRouter);

io.on('connection', (socket) => {
  console.log('a user connected');
});

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
})
