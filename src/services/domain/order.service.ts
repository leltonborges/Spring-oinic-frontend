import { API_CONFIG } from './../../config/api.config';
import { OrderDTO } from './../../models/order.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class OrderService{

    constructor(public http: HttpClient){

    }

    insert(obj: OrderDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/requests`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

}