import dotenv from 'dotenv';

dotenv.config();

const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-secret-key-change-this',
  expiresIn: '1m', // Changed to 1 minute for testing (change back to '7d' for production)
};

export default jwtConfig;