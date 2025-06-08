import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: 'Authorization header is missing or invalid' });
        return
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        const userId = decoded.payload;
        req.headers["x-user-id"] = userId;

        next();
    } catch (error) {
        res.status(403).json({ message: 'Unauthorized' });
    }
};
