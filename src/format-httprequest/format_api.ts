import { Http, RequestOptions, Response } from '@angular/http';
import { AsyncableClassBase } from 'ws-async-base';
import { HttpType, IError } from './contract';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * 支持异步等待延时的API服务基类，封装了通用请求方法和静态类型化的返回结果
 */
export class FormatHttpAsyncClient<T> extends AsyncableClassBase {

    constructor(protected http: Http) { super(); }

    protected InvokeAsync = async (url: string, options?: RequestOptions, type: HttpType = HttpType.GET, args?: any): Promise<[boolean, IError, T]> => {
        const action =
            type === HttpType.GET ? () => this.http.get(url, options) :
                type === HttpType.POST ? () => this.http.post(url, args, options) :
                    type === HttpType.PUT ? () => this.http.put(url, args, options) :
                        type === HttpType.DELETE ? () => this.http.delete(url, options) :
                            () => this.http.options(url, options);
        try {
            return [true, null, await action().map(i => i.json() as T).toPromise()];
        } catch (error) {
            if (!(error instanceof Response)) { return [false, { errors: error, url: url, options: options, type: type, args: args }, null]; }
            try {
                return [true, null, error.json() as T];
            } catch (erro2) { return [false, { errors: erro2, url: url, options: options, type: type, args: args }, null]; }
        }
    }

}