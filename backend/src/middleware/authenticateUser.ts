import jwtConfig from "../config/jwt.config.js";
import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';

/** Use on routes that require login. Verifies JWT and sets req.user (id, email, name, role). */
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized. Log in or send a valid token in Authorization header.' });
    }
    jwt.verify(token, jwtConfig.secret, (error: any, decoded: any) => {
        if (error) {
            return res.status(403).json({ error: 'Forbidden. Token invalid or expired.' });
        }
        (req as any).user = decoded;
        next();
    });
};

export const getUserInfo = (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, jwtConfig.secret, (error: any, user: any) => {
        if (error) {
            console.log('Token verification failed:', error);
            return res.status(403).json({ error: 'Forbidden' });
        }
        console.log('Token verified successfully:', user);
        res.json(user);
    });
};