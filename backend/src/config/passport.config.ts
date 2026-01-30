import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { PrismaClient } from '../generated/prisma';

dotenv.config();

/* const user: {
    googleId: string;
    email: string | undefined;
    name: string;
    picture: string | undefined;
}
| null = null; */

const prisma= new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //check if user exists
        let user = await prisma.user.findUnique({
          where: {
            googleId: profile.id
          }
        });

        //if not, create user
        if(!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              email: profile.emails?.[0]?.value,
              name: profile.displayName,
              picture: profile.photos?.[0]?.value,
              role: 'CANDIDATE' //default role
            }
          });

          console.log('New user created:', user);
        }
        else {
          console.log('Existing user found:', user);
        }

        return done(null, user);
      }
      catch(error) {
        console.log('Error:', error);
        return done(error as Error);
      }
    }
  )
);

// Serialize user for session (or skip if using JWT only)
// passport.serializeUser((user: any, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user: any, done) => {
//   done(null, user);
// });

export default passport;