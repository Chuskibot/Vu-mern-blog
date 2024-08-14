import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './routes/user.route.js';

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



//for my api 
app.use('/api/user', UserRoutes);

app.listen(2000, () => {
  console.log('Server run hoice port Number 2000');
});
