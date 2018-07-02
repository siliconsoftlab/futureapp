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
  address: any;
  nric: string;
  fullname: string;
  contactno: string;
  street: string;
  unitno: string;
  postalcode: string;
  noofoccupants: number;
  noofrooms: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    //console.log('ionViewDidLoad VerifyerrorPage');
  }
  gotovalidatepage() {
    this.navCtrl.push(ValidatePage,{"nric":this.nric,"fullname":this.fullname});
  }
}
