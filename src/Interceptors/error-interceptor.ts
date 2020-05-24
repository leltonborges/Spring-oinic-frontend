import { StorageService } from './../services/storageService';
import { Observable } from 'rxjs/Rx';
import { HttpInterceptor , HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS} from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
   
    constructor(public storage: StorageService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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

            switch(erroObj.status){
                case 403:this.handle403();
                break;
            }

            return Observable.throw(erroObj);
        }) as any;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider ={
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};