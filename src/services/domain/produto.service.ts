import { ProductDTO } from './../../models/produto.dto';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService{
    constructor(public http: HttpClient){

    }

    findById(productId: string){
        return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${productId}`);
    }

    findByCategoria(catID : string) {
        return this.http.get(`${API_CONFIG.baseUrl}/products?categories=${catID}`);
    }

    getSmallImageFromBucket(id: string): Observable<any>{
        let url =`${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }

    getImageFromBucket(id: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }
}
