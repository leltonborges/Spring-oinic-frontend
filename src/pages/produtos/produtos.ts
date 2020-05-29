import { ProductDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProductDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items =[
      {
        id: "1",
        name: "Mouse",
        price: 80.96
      },
      {
        id:"2",
        name:"teclado",
        price: 100.42
      }
    ]
  }

}
