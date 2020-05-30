import { API_CONFIG } from './../../config/api.config';
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
        this.loadImageUrl();
      },
      error => {});
  }

  loadImageUrl(){
    for(var i=0; i < this.items.length; i++){
      let item = this.items[i];
      this.productService.getSmallImageFromBucket(item.id)
      .subscribe(reponse => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      },
      error => {});
    }
  }

  showDetail(){
    this.navCtrl.push("ProdutoDetailPage");
  }
}