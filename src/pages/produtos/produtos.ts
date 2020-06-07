import { API_CONFIG } from './../../config/api.config';
import { ProductService } from './../../services/domain/produto.service';
import { ProductDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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
    public productService: ProductService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('cat_id');
    let loader = this.presentLoad();
    this.productService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrl();
        loader.dismiss();
      },
      error => {
        loader.dismiss();
      });
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

  showDetail(productId: string){
    this.navCtrl.push("ProdutoDetailPage", {productId: productId});
  }

  presentLoad(){
    let loader = this.loadingCtrl.create(
      {
        content:"Aguarde..."
      }
    );
    loader.present();
    return loader;
  }
}