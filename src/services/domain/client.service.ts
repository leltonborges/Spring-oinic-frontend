import { StorageService } from './../storageService';
import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ClientDTO } from '../../models/client.dto';

@Injectable()
export class ClientService{

    constructor(
        public http: HttpClient,
        public storage: StorageService){

    }

    findByEmail(email: string){
        return this.http.get(`${API_CONFIG.baseUrl}/clients/email?email=${email}`);
    }

    getImageFromBucket(id: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }

    insert(obj: ClientDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/clients`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
       
    }

    findById(id: string){
        return this.http.get(`${API_CONFIG.baseUrl}/clients/${id}`)
    }
}