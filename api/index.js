import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';









dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('DB is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
// root path eir jonno  
app.use(express.json());
app.use(cookieParser());



//for my api 

app.listen(2000, () => {
  console.log('Server run hoice port Number 2000');
});

app.use('/api/user', UserRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next ) =>{

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server Error'
  res.status(statusCode).json({

    success: false,
    statusCode,
    message
  })
})