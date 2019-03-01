import { Request, Response, NextFunction } from 'express';

export default function validator(req: Request, res: Response, next: NextFunction) {
    if (req.method !== 'POST') {
        return res.status(405).send('Supported methods: POST');
    }

    next();
}
