import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UploadPage } from '../upload/upload';
/**
 * Generated class for the VerifysuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verifysuccess',
  templateUrl: 'verifysuccess.html',
})
export class VerifysuccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad VerifysuccessPage');
  }
  uploadphotos() {

    this.navCtrl.push(UploadPage);

  }
}
