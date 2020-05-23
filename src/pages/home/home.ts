import { CredenciaisDTO } from './../../models/credenciaisDTO';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    password: ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController) {
  }

  login(){
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');
  }

  ionViewWillEnter(){
   this.menu.swipeEnable(false);
  }
  ionViewCanLeave(){
   this.menu.swipeEnable(true);
  }
}
