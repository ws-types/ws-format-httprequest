"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_async_base_1 = require("ws-async-base");
var contract_1 = require("./contract");
require("rxjs/add/operator/toPromise");
/**
 * 支持异步等待延时的API服务基类，封装了通用请求方法和静态类型化的返回结果
 */
var FormatHttpAsyncClient = (function (_super) {
    __extends(FormatHttpAsyncClient, _super);
    function FormatHttpAsyncClient(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        return _this;
    }
    FormatHttpAsyncClient.prototype.InvokeAsync = function (url, opts, type, args) {
        if (type === void 0) { type = contract_1.HttpType.GET; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var options, action, result, errorResp_1, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = (opts || {});
                        options.observe = 'response';
                        options.responseType = 'json';
                        if (args) {
                            options.params = args;
                        }
                        this.http.get(url, options);
                        action = type === contract_1.HttpType.GET ? function () { return _this.http.get(url, options); } :
                            type === contract_1.HttpType.POST ? function () { return _this.http.post(url, args, options); } :
                                type === contract_1.HttpType.PUT ? function () { return _this.http.put(url, args, options); } :
                                    type === contract_1.HttpType.DELETE ? function () { return _this.http.delete(url, options); } :
                                        function () { return _this.http.options(url, options); };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, action().toPromise()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.status === 200 ?
                                [true, null, result.body] :
                                [false, { errors: result, url: url, options: options, type: type, args: args }, null]];
                    case 3:
                        errorResp_1 = _a.sent();
                        try {
                            error = errorResp_1.error;
                            if (error instanceof ProgressEvent) {
                                return [2 /*return*/, [false, { errors: error, url: url, options: options, type: type, args: args }, null]];
                            }
                            else {
                                return [2 /*return*/, [true, null, errorResp_1]];
                            }
                        }
                        catch (erro2) {
                            return [2 /*return*/, [false, { errors: erro2, url: url, options: options, type: type, args: args }, null]];
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return FormatHttpAsyncClient;
}(ws_async_base_1.AsyncableClassBase));
exports.FormatHttpAsyncClient = FormatHttpAsyncClient;
//# sourceMappingURL=format_api.js.map