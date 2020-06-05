import { ProductDTO } from './../../models/produto.dto';
import { CartService } from './../../services/domain/cart.service';
import { RequestDTO } from './../../models/request.dto';
import { ClientService } from './../../services/domain/client.service';
import { StorageService } from './../../services/storageService';
import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];
  request: RequestDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClientService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clientService.findByEmail(localUser.email)
      .subscribe(response => {
        this.items = response['addresses'];
        let cart = this.cartService.getCart();
        this.request = {
          client: { id: response['id']},
          AddressDelivery: null,
          payment: null,
          itens: cart.items.map(x => {
          return {quantity: x.quantity, product: {id: x.product.id}}
        })
      }
    },
    error => {
      if(error.status == 403){
        this.navCtrl.setRoot('HomePage');
      }
      });
    }else{
      this.navCtrl.setRoot('HomaPage');
    }
  }

  nextPage(item: ProductDTO){
    this.request.AddressDelivery = {id: item.id};
    console.log(this.request);
  }
  
}
