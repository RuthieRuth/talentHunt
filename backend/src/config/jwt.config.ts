import dotenv from 'dotenv';

dotenv.config();

const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-secret-key-change-this',
  expiresIn: '2d', // Token expires in 2 days
} as const; // without as const TypeScript would see it as as a literal string 

export default jwtConfig;