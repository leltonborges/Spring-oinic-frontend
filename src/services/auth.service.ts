import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciaisDTO';
import { Injectable } from "@angular/core";
import { text } from '@angular/core/src/render3/instructions';

@Injectable()
export class AuthService{

    constructor(public http: HttpClient){

    }
    authenticate(creds : CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }
}