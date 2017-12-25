import { HttpHeaders, HttpParams } from "@angular/common/http";

export enum HttpType {
    GET, POST, PUT, DELETE, OPTIONS
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