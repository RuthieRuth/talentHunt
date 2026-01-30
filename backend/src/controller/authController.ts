import passport from "passport";
import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken';
import jwtConfig  from '../config/jwt.config';
import dotenv from 'dotenv';

dotenv.config();

export const googleAuth = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
    prompt: 'select_account'
  }) (req, res, next);
};

export const googleAuthCallback = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', { session: false }, (err: any, user: any) => {
        if (err) {
        console.error('Auth error:', err);
        return res.redirect(`${process.env.FRONTEND_URL}/Login?error=auth_failed`);
        
        }
        if (!user) {
        console.error('No user returned from Google');
        return res.redirect(`${process.env.FRONTEND_URL}/Login?error=no_user`);
        }

        try {
        // Generate JWT token (include id so protected routes know who is logged in)
        const token = jwt.sign({
            id: user.id,
            userId: user.googleId,
            email: user.email,
            name: user.name,
            role: user.role || 'ADMIN' || 'CANDIDATE' // Example role assignment
        },
            jwtConfig.secret,
            { expiresIn: jwtConfig.expiresIn });

        console.log('JWT token generated, redirecting to frontend');

        // Redirect depending on role in token
        const redirectPath = user.role === 'ADMIN' ? 'AdminDashboard' : 'Dashboard';
        res.redirect(`${process.env.FRONTEND_URL}/${redirectPath}?token=${token}`);

        } catch (error) {
        console.error('Token generation error:', error);
        res.redirect(`${process.env.FRONTEND_URL}/Login?error=server_error`);
        }
        
    })(req, res, next);
};

