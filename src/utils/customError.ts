// src/utils/customError.ts
export class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message); // call the super class constructor and pass in the message
        this.status = status; // set status property to the error object
        this.name = 'CustomError'; // set the name of the error object to 'CustomError'
    }
}
