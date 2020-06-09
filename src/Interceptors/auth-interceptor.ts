import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storageService';
import { Observable } from 'rxjs/Rx';
import { HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();
        let size = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0, size) == API_CONFIG.baseUrl;
        if(localUser && requestToAPI){
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer '+ localUser.token)});
            return next.handle(authReq);
        }else{
            return next.handle(req);
        }
    }
}

export const AuthInterceptorProvider ={
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};