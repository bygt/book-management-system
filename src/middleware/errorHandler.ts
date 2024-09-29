import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError'; 

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {

    const status = err.status || 500; // If err.status is undefined, set it to 500
    const message = err.message || 'Something went wrong!'; //If err.message is undefined, set it to 'Something went wrong!'

    return res.status(status).json({ message, status }); // Send the status and message as a response
};

export default errorHandler;
