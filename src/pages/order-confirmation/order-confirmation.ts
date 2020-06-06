import { ClientService } from './../../services/domain/client.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { ClientDTO } from './../../models/client.dto';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart-item';
import { RequestDTO } from './../../models/request.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  order: RequestDTO;
  cartItems:CartItem[];
  client: ClientDTO;
  address: EnderecoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clientService: ClientService) {

    this.order = this.navParams.get('order');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.clientService.findById(this.order.client.id)
    .subscribe(response => {
      this.client = response as ClientDTO;
      this.address = this.findAddres(this.order.AddressDelivery.id, response['addresses']);
    },
    error => {
      this.navCtrl.setRoot('HomePage');
    });
  }

  private findAddres(id: string, list: EnderecoDTO[]): EnderecoDTO{
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total(){
    return this.cartService.totalCart();
  }
}
