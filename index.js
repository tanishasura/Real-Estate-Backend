import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

//***************MONGODB******************//
const connectDb = async () => {
    try { const conn = await mongoose.connect("mongodb+srv://tanisha:tanisha@cluster0.hz7u7mi.mongodb.net/mern-estate");
      console.log(`Connected to MongoDB database ${conn.connection.host}`);
    } catch (error) { console.log(error); }
  };
  connectDb();

//   const __dirname = path.resolve();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(cookieParser());

// *****************PORT******************** //

app.listen(3001, () => {
  console.log('Server is running on port 3001!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});