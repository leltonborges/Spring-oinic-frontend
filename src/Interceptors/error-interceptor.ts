import { Observable } from 'rxjs/Rx';
import { HttpInterceptor , HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS} from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou no interceptor");
        return next.handle(req)
        .catch((error, caught) => {

            let erroObj = error;
            if(erroObj.error){
                erroObj = erroObj.error;
            }
            if(!error.status){
                erroObj= JSON.parse(erroObj);
            }

            console.log("Error detectado pelo interceptor");
            console.log(erroObj);

            return Observable.throw(erroObj);
        }) as any;
    }
}

export const ErrorInterceptorProvider ={
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};