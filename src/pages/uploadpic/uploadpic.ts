import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewconfirmationPage } from '../viewconfirmation/viewconfirmation';
import { ValidatePage } from '../validate/validate';
/**
 * Generated class for the UploadpicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uploadpic',
  templateUrl: 'uploadpic.html',
})
export class UploadpicPage {
  mypic: string;


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
  public base64Image: string[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private sanitizer: DomSanitizer) {
    this.base64Image = new Array();
    this.fullname = this.navParams.get('fullname');
    this.nric = this.navParams.get('nric');
    this.contactno = this.navParams.get('contactno');
    this.street = this.navParams.get('street');
    this.unitno = this.navParams.get('unitno');
    this.postalcode = this.navParams.get('postalcode');
    this.noofoccupants = this.navParams.get('noofoccupants');
    this.noofrooms = this.navParams.get('noofrooms');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadpicPage');
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
      //  alert("Success");
      console.log("imageUri " + imageUri);
      this.base64Image.push(imageUri);
      this.mypic = imageUri;
      let imageUris = this.base64Image.map(o => o).join(',');
      console.log("imageUris is " + imageUris);
      // this.mypic =this.sanitizer.bypassSecurityTrustUrl(  'data:image/jpeg;base64,' + imageUri);
    }, (err) => {
      console.log("Caqmera err " + err);
    });
  }
  next() {
    this.navCtrl.push(ViewconfirmationPage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms });
  }
  prev() {
    this.navCtrl.push(ValidatePage);
  }
}
