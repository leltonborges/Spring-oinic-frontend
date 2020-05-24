import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from '../../models/credenciais.dto';
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

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {
  }

  login(){
    this.auth.authenticate(this.creds)
    .subscribe(response => {
      this.auth.successFullLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
  }

  ionViewWillEnter(){
   this.menu.swipeEnable(false);
  }
  ionViewCanLeave(){
   this.menu.swipeEnable(true);
  }
}
