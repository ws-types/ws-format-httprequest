import { HttpHeaders, HttpParams } from "@angular/common/http";
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
export interface IRequestOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    withCredentials?: boolean;
}
