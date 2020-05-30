import { ProductService } from './../../services/domain/produto.service';
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
    public navParams: NavParams,
    public productService: ProductService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('cat_id');
    this.productService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
      },
      error => {});
  }
}