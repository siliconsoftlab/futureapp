import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubmissionsuccessPage } from '../submissionsuccess/submissionsuccess';
/**
 * Generated class for the ViewconfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewconfirmation',
  templateUrl: 'viewconfirmation.html',
})
export class ViewconfirmationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewconfirmationPage');
  }
  next() {
    this.navCtrl.push(SubmissionsuccessPage);
  }
  
}
