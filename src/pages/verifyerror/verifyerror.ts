import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ValidatePage } from '../validate/validate';
import { SubmissionsuccessPage } from '../submissionsuccess/submissionsuccess';
/**
 * Generated class for the VerifyerrorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verifyerror',
  templateUrl: 'verifyerror.html',
})
export class VerifyerrorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyerrorPage');
  }
  gotovalidatepage() {
    this.navCtrl.push(SubmissionsuccessPage);
  }
}
