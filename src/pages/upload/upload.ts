import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewconfirmationPage } from '../viewconfirmation/viewconfirmation';
import { ValidatePage } from '../validate/validate';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }
next(){
  this.navCtrl.push(ViewconfirmationPage);
}
prev(){
  this.navCtrl.push(ValidatePage);
}
}
