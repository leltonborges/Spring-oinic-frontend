import { API_CONFIG } from './../../config/api.config';
import { CidadeDTO } from './../../models/cidade.dto';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class cidadeService{
    constructor(
        public http: HttpClient
    ){

    }

    findAll(estadoId: string): Observable<CidadeDTO[]>{
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/states/${estadoId}/cities`)
    }
}