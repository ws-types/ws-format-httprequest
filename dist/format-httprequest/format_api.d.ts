import { Http, RequestOptions } from '@angular/http';
import { AsyncableClassBase } from 'ws-async-base';
import { HttpType, IError } from './contract';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
/**
 * 支持异步等待延时的API服务基类，封装了通用请求方法和静态类型化的返回结果
 */
export declare class FormatHttpAsyncClient<T> extends AsyncableClassBase {
    protected http: Http;
    constructor(http: Http);
    protected InvokeAsync: (url: string, options?: RequestOptions, type?: HttpType, args?: any) => Promise<[boolean, IError, T]>;
}
