export declare enum HttpType {
    GET = 0,
    POST = 1,
    PUT = 2,
    DELETE = 3,
    OPTIONS = 4,
}
export interface IError {
    errors?: any;
    msg?: string;
    [propName: string]: any;
}
