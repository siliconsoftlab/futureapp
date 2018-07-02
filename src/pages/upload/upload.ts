import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ViewconfirmationPage } from '../viewconfirmation/viewconfirmation';
import { ValidatePage } from '../validate/validate';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Item } from '../Item';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  public base64Image: any;
  // public base64Images: Array<string>

  public isThirdBedRoom: boolean;
  public isfourthBedRoom: boolean;
  public isrowVisbile: boolean;

  address: any;
  nric: string;
  fullname: string;
  contactno: string;
  street: string;
  unitno: string;
  postalcode: string;
  noofoccupants: number;
  noofrooms: number;


  public maindoor: string = 'MAIN DOOR';
  public livingroom: string = 'LIVING ROOM';
  public kitchen: string = 'KITCHEN';
  public bedroom1: string = 'MY BEDROOM1';
  public bedroom2: string = 'MY BEDROOM2';
  public bedroomb: string = 'BEDROOM B';
  public bedroomc: string = 'BEDROOM C';
  public bedroomd: string = 'BEDROOM D';


  public maindoorpic: string;
  public livingroompic: string;
  public kitchenpic: string;
  public bedroom1pic: string;
  public bedroom2pic: string;
  public bedroombpic: string;
  public bedroomcpic: string;
  public bedroomdpic: string;
  public index: number = 0;

  /* public base64Images: Array<string>=[];
   public items:Array<Item>=[new Item(1,"MAIN DOOR"),new Item(2,"LIVING ROOM")];*/

   mypic: string;

  position: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private alertCtrl: AlertController, private sanitizer: DomSanitizer) {

    this.fullname = this.navParams.get('fullname');
    this.nric = this.navParams.get('nric');
    this.contactno = this.navParams.get('contactno');
    this.street = this.navParams.get('street');
    this.unitno = this.navParams.get('unitno');
    this.postalcode = this.navParams.get('postalcode');
    this.noofoccupants = this.navParams.get('noofoccupants');
    this.noofrooms = this.navParams.get('noofrooms');

    if (this.noofrooms == 3 || this.noofrooms == 4) {
      this.isrowVisbile = true;
    } else {
      this.isrowVisbile = false;
    }

    if (this.noofrooms == 3) {
      this.isThirdBedRoom = true;
    } else if (this.noofrooms == 4) {
      this.isThirdBedRoom = true;
      this.isfourthBedRoom = true;
    } else {
      this.isThirdBedRoom = false;
      this.isfourthBedRoom = false;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }
  next() {
    this.navCtrl.push(ViewconfirmationPage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms });
  }
  prev() {
    this.navCtrl.push(ValidatePage);
  }

  takePicture() {

    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageUri) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

      console.log("imageUri " + imageUri);
      // this.base64Image.push(imageUri);
      this.base64Image = imageUri;
      this.mypic = imageUri;
      let imageUris = this.base64Image.map(o => o).join(',');
      console.log("imageUris is " + imageUris);

     
    
     
    
      // this.base64Image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + imageUri);
    }, (err) => {
      alert(err);
    });
  }
  takePicture1(position) {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      //this.base64Images[position]='data:image/jpeg;base64,' + imageData;
      //  this.base64Images.push('data:image/jpeg;base64,' + imageData);

      /* switch(position){
         case this.maindoor:
         this.maindoorpic='data:image/jpeg;base64,' + imageData;
         break;
         case this.livingroom:
         this.livingroompic='data:image/jpeg;base64,' + imageData;
         break;
         case this.kitchen:
         this.kitchenpic='data:image/jpeg;base64,' + imageData;
         break;
         case this.bedroom1:
         this.bedroom1pic='data:image/jpeg;base64,' + imageData;
         break;
         case this.bedroom2:
         this.bedroom2pic='data:image/jpeg;base64,' + imageData;
         break;
         case this.bedroomb:
         this.bedroombpic='data:image/jpeg;base64,' + imageData;
         break;
         case this.bedroomc:
         this.bedroomcpic='data:image/jpeg;base64,' + imageData;
         break;
         case this.bedroomd:
         this.bedroomdpic='data:image/jpeg;base64,' + imageData;
         break;
 
       }*/

    }, (err) => {
      this.displayErrorAlert(err);
    });

  }
  displayErrorAlert(err) {
    console.log(err);
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Error while trying to capture picture',
      buttons: ['OK']
    });
    alert.present();
  }
}
