# Format http request and static-type response in generic.
[![Build Status](https://travis-ci.org/ws-types/ws-format-httprequest.svg?branch=master)](https://travis-ci.org/ws-types/ws-format-httprequest)

install this package:
```npm
npm install ws-format-httprequest --s
```

## Use it
First, you should create an interface for response type you want (in typescript):
```typescript
/*this type must match your server return. */
interface APIResponse{
    code:number;
    msg:string;
    [propName:string]:any;
}
```
And make extends for your custom class:
```typescript
export class MyAPIClass extends FormatHttpAsyncClient <APIresponse>{
    // ......
}
```
Then, you can send request and receive response in static-type and sync-syntax in your code like this:
```typescript
testFuct = async () => {
    const options = new RequestOptions{/* create your http request options if need*/}
    // options' default value is undefined, type's default is HttpType.GET, args is undefined as default.
   const [succeed,error,result] = await  this.InvokeAsync('the url you want send request', options, HttpType.POST, JSON.stringfy({name:'sb', age:66}));
   if(succeed){
       if(result.code===0){
           // check your server code to decide what to do next.
       }else{
           // if the code is not allowed, alert to notify if you want here.
       }
   }else{
       // succeed=false means the request is failed by some mistakes such as internet-problems. So throw error if you need here.
   }
}
```

It's easy.