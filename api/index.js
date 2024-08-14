import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});


//for my api 
app.get('/test', (req, res) => {
  res.json({ message: 'API is working' });
});

app.listen(2000, () => {
  console.log('Server run hoice port Number 2000');
});
