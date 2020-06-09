import { CartService } from './../../services/domain/cart.service';
import { API_CONFIG } from './../../config/api.config';
import { ProductService } from './../../services/domain/produto.service';
import { ProductDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProductDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let id = this.navParams.get("productId");
    this.productService.findById(id)
    .subscribe(response =>{
      this.item = response
      this.getImageIfExists();
    },
    error => {})
  }

  getImageIfExists(){
    this.productService.getImageFromBucket(this.item.id)
    .subscribe(response =>{
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
    },
    error => {});
  }

  addToCart(produto: ProductDTO) {
    this.cartService.addProduct(produto);
    this.navCtrl.setRoot('CartPage');
  }
}
