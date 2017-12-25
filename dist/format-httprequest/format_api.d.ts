import { HttpClient } from '@angular/common/http';
import { AsyncableClassBase } from 'ws-async-base';
import { HttpType, IError, IRequestOptions } from './contract';
import 'rxjs/add/operator/toPromise';
/**
 * 支持异步等待延时的API服务基类，封装了通用请求方法和静态类型化的返回结果
 */
export declare class FormatHttpAsyncClient<T> extends AsyncableClassBase {
    protected http: HttpClient;
    constructor(http: HttpClient);
    protected InvokeAsync(url: string, opts?: IRequestOptions, type?: HttpType, args?: any): Promise<[boolean, IError, T]>;
}
