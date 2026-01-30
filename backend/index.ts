import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';  
import passport from 'passport';

import './src/config/passport.config.js';
import appRoutes from './src/routes/appRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Welcome to the Talent Hunt Backend!');
});

app.get("/createToken", async (req, res) => {
  res.send ("Token created");
});

app.use('/', appRoutes);
//app.use('/auth', appRoutes);
//app.use('/auth/dashboard', appRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});