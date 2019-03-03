import { Request, Response, NextFunction } from 'express';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);

    if (res.statusCode >= 200 && res.statusCode <= 299) {
        res.status(500);
    }

    return res.json({
        error: {
            message: err.message
        }
    });
}
