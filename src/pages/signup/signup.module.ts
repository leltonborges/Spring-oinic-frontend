import { EstadoService } from './../../services/domain/estado.service';
import { cidadeService } from './../../services/domain/cidade.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers:[
    cidadeService,
    EstadoService
  ]
})
export class SignupPageModule {}
