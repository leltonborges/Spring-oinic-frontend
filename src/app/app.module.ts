import { ImageUtilService } from './../services/image-util.service';
import { CartService } from './../services/domain/cart.service';
import { ProductService } from './../services/domain/produto.service';
import { AuthInterceptorProvider } from './../Interceptors/auth-interceptor';
import { ClientService } from './../services/domain/client.service';
import { StorageService } from './../services/storageService';
import { CategoriaService } from './../services/domain/categoria.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ErrorInterceptorProvider } from '../Interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClientService,
    ProductService,
    CartService,
    ImageUtilService
  ]
})
export class AppModule {}
