import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestDTO } from './../../models/request.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  order: RequestDTO;
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.order = this.navParams.get('order');
      this.formGroup= this.formBuilder.group(
        {
          numberPlots: [1, Validators.required],
          "@typePay": ["PaymentCard", Validators.required]
        }
      );
  }

  nextPage(){
    this.order.payment= this.formGroup.value;
    console.log(this.order);
  }
}
