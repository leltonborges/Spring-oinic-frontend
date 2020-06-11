import { API_CONFIG } from './../../config/api.config';
import { ClientService } from './../../services/domain/client.service';
import { ClientDTO } from './../../models/client.dto';
import { StorageService } from './../../services/storageService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public camera: Camera) {
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
      });
    }
    
  sendPicture(){
    this.clientService.uploadePicture(this.picture)
    .subscribe(response => {
      this.picture = null;
      this.loadData();
    },
    error => {});
  }

  calcel(){
    this.picture = null;
  }
}
