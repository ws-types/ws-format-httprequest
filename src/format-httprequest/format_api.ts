import { HttpClient } from '@angular/common/http';
import { AsyncableClassBase } from 'ws-async-base';
import { HttpType, IError, IRequestOptions } from './contract';
import 'rxjs/add/operator/toPromise';

interface IJsonBodyRequestOptions extends IRequestOptions {
    observe?: 'body';
    responseType?: 'json';
}

/**
 * 支持异步等待延时的API服务基类，封装了通用请求方法和静态类型化的返回结果
 */
export class FormatHttpAsyncClient<T> extends AsyncableClassBase {

    constructor(protected http: HttpClient) { super(); }

    protected async InvokeAsync(url: string, opts?: IRequestOptions, type: HttpType = HttpType.GET, args?: any): Promise<[boolean, IError, T]> {
        const options: IJsonBodyRequestOptions = opts || {};
        options.observe = 'body';
        options.responseType = 'json';
        if (args) {
            options.params = args;
        }
        const action =
            type === HttpType.GET ? () => this.http.get<T>(url, options) :
                type === HttpType.POST ? () => this.http.post<T>(url, options) :
                    type === HttpType.PUT ? () => this.http.put<T>(url, options) :
                        type === HttpType.DELETE ? () => this.http.delete<T>(url, options) :
                            () => this.http.options<T>(url, options);
        try {
            return [true, null, await action().toPromise()];
        } catch (error) {
            // if (!(error instanceof Response)) { return [false, { errors: error, url: url, options: options, type: type, args: args }, null]; }
            try {
                const resp = error;
                if (resp instanceof ProgressEvent) {
                    return [false, { errors: resp, url: url, options: options, type: type, args: args }, null];
                } else {
                    return [true, null, resp];
                }
            } catch (erro2) { return [false, { errors: erro2, url: url, options: options, type: type, args: args }, null]; }
        }
    }

}