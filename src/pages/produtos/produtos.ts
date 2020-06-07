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

  items: ProductDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let categoria_id = this.navParams.get('cat_id');
    let loader = this.presentLoad();
    this.productService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end  = this.items.length;
        this.loadImageUrl(start, end);
        loader.dismiss();
      },
      error => {
        loader.dismiss();
      });
  }
  loadImageUrl(start: number, end: number){
    for(var i=start; i < end; i++){
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

  doRefresh(refresher){
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout( () => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll){
    this.page++;
    this.loadData();
    setTimeout( () => {
      infiniteScroll.complete();
    }, 1000);
  }
}