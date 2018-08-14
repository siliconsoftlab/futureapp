import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ValidatePage } from '../validate/validate';
import { SubmissionsuccessPage } from '../submissionsuccess/submissionsuccess';
import { HomePage } from '../home/home';
/**
 * Generated class for the VerifyerrorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


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
  dob:Date;
  rent:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fullname = this.navParams.get('fullname');
    this.nric = this.navParams.get('nric');
    this.contactno = this.navParams.get('contactno');
    this.street = this.navParams.get('street');
    this.unitno = this.navParams.get('unitno');
    this.postalcode = this.navParams.get('postalcode');
    this.noofoccupants = this.navParams.get('noofoccupants');
    this.noofrooms = this.navParams.get('noofrooms');
    this.dob = this.navParams.get('dob');
    this.rent = this.navParams.get('rent');
  }
  
  ionViewDidLoad() {
    //console.log('ionViewDidLoad VerifyerrorPage');
  }
  gotovalidatepage() {
    this.navCtrl.push(ValidatePage,{"nric":this.nric,"fullname":this.fullname,"contactno":this.contactno,"street":this.street,"unitno":this.unitno,"postalcode":this.postalcode,"noofoccupants":this.noofoccupants,"noofrooms":this.noofrooms,"dob":this.dob,"rent":this.rent });
  }
  logout(){
    this.navCtrl.setRoot(HomePage);
  }
}
