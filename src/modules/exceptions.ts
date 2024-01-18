export class ApiError extends Error{
    code: number;

    constructor(message: string, code: number){
        super(message);
        this.code = code;
    }
}


export class NotFound extends ApiError{
    constructor(message: string){
        super(
            message,
            404,
        );
    }
}