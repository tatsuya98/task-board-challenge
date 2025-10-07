import {CustomError} from "./errorHandling/ErrorHandler";

export function customError (statusCode: number): CustomError{
    if (statusCode === 404){
        return
    }
}


export function validateId(id: string):boolean{
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const uuidLength: number = 36
    return !(id.length !== uuidLength && !UUID_REGEX.test(id));
}
