import { Request, Response, NextFunction } from 'express';
interface HttpError extends Error {
    statusCode?: number;
    data?: any;
}

export const errorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.statusCode || 500;
    let message = err.message || 'An unknown error occurred.';

    if (status === 500 && process.env.NODE_ENV === 'production') {
        message = 'Internal Server Error';
    }

    res.status(status).json({
        error: {
            message: message,
            data: err.data
        }
    });
};
