import { type Request, type Response, type NextFunction } from 'express';
import {CustomError} from "./ErrorHandler.ts";
interface HttpError extends Error {
    statusCode?: number;
    data?: any;
}

 const errorHandler = (
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
export {errorHandler, CustomError}