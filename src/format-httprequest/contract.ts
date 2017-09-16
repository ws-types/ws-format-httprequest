
export enum HttpType {
    GET, POST, PUT, DELETE, OPTIONS
}

export interface IError {
    errors?: any;
    msg?: string;
    [propName: string]: any;
}
