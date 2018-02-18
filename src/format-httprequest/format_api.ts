import { HttpClient, HttpResponse } from '@angular/common/http';
import { AsyncableClassBase } from 'ws-async-base';
import { HttpType, IError, IRequestOptions } from './contract';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';

interface IJsonBodyRequestOptions extends IRequestOptions {
    observe: 'response';
    responseType?: 'json';
}

/**
 * 支持异步等待延时的API服务基类，封装了通用请求方法和静态类型化的返回结果
 */
export class FormatHttpAsyncClient<T> extends AsyncableClassBase {

    constructor(protected http: HttpClient) { super(); }

    protected async InvokeAsync(url: string, opts?: IRequestOptions, type: HttpType = HttpType.GET, args?: any): Promise<[boolean, IError, T]> {
        const options: IJsonBodyRequestOptions = (opts || {} as any);
        options.observe = 'response';
        options.responseType = 'json';
        this.http.get<T>(url, options);
        const action: () => Observable<HttpResponse<T>> =
            type === HttpType.GET ? () => this.http.get<T>(url, options) :
                type === HttpType.POST ? () => this.http.post<T>(url, args, options) :
                    type === HttpType.PUT ? () => this.http.put<T>(url, args, options) :
                        type === HttpType.DELETE ? () => this.http.delete<T>(url, options) :
                            () => this.http.options<T>(url, options);
        try {
            const result = await action().toPromise();
            return result.status === 200 ?
                [true, null, result.body] :
                [false, { errors: result, url: url, options: options, type: type, args: args }, null];
        } catch (errorResp) {
            try {
                const error = (errorResp as HttpErrorResponse).error;
                if (error instanceof ProgressEvent) {
                    return [false, { errors: error, url: url, options: options, type: type, args: args }, null];
                } else {
                    return [true, null, errorResp];
                }
            } catch (erro2) { return [false, { errors: erro2, url: url, options: options, type: type, args: args }, null]; }
        }
    }

}