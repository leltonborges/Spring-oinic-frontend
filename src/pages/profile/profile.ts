import { API_CONFIG } from './../../config/api.config';
import { ClientService } from './../../services/domain/client.service';
import { ClientDTO } from './../../models/client.dto';
import { StorageService } from './../../services/storageService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';;

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  client: ClientDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClientService,
    public camera: Camera,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clientService.findByEmail(localUser.email)
      .subscribe(response => {
        this.client = response as ClientDTO;
        this.getImageIfExists();
      },
      error => {
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
    }else{
      this.navCtrl.setRoot('HomaPage');
    }
  }

  getImageIfExists(){
    this.clientService.getImageFromBucket(this.client.id)
    .subscribe(response => {
      this.client.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp_img${this.client.id}.jpg`;
    },
    error => {});
  }

  getCameraPicture(){
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/jpeg;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  getGalleryPicture(){
      this.cameraOn = true;
      const options: CameraOptions = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
       this.picture = 'data:image/jpeg;base64,' + imageData;
       this.cameraOn = false;
      }, (err) => {
        this.cameraOn = false;
      });
    }
    
  sendPicture(){
    let loader = this.presentLoad();
    this.clientService.uploadePicture(this.picture)
    .subscribe(response => {
      this.picture = null;
      this.loadData();
      loader.dismiss();
    },
    error => {
      loader.dismiss();
    });
  }

  calcel(){
    this.picture = null;
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
