import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../Models/Auth/userModel';

interface AuthenticatedRequest extends ExpressRequest {
    user?: any; 
}

const secret_key = process.env.SECRET_KEY as string;

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secret_key) as any;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};


const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded: any = jwt.verify(token, secret_key);
        if (decoded && decoded.role === UserRole.Admin) { 
            req.user = decoded;
            next();
        } else {
            return res.status(403).json({ error: 'Access denied. Only admins are allowed.' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};





export {authenticate, isAdmin}