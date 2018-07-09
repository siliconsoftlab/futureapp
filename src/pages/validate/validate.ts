import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { VerifyPage } from '../verify/verify';
import { UserResponse } from '../UserResponse';
import { ValidateInput } from '../ValidateInput';
import { HomePage } from '../home/home';


/**
 * Generated class for the ValidatePage page.
 *
 * See ttps://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-validate',
  templateUrl: 'validate.html',
})
export class ValidatePage {
  user: UserResponse;
  validate: ValidateInput;
  nric: string;
  fullname: string;

 /* contactno: string;
  street: string;
  unitno: string;
  postalcode: string;
  noofoccupants: number;
  noofrooms: number;*/


   contactno: string='98718177';
   street: string='Lorong 4 Geylang';
   unitno: string='47a';
   postalcode: string='399291';
   noofoccupants: number=10;
   noofrooms: number=3;

  userRes: UserResponse;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder) {
    // this.user=this.fb.group({username:['',Validators.required]});
    // this.userRes=this.navParams.get('data');

    this.fullname = this.navParams.get('nric');
    this.nric = this.navParams.get('fullname');
    this.contactno = this.navParams.get('contactno');
    this.street = this.navParams.get('street');
    this.unitno = this.navParams.get('unitno');
    this.postalcode = this.navParams.get('postalcode');
    this.noofoccupants = this.navParams.get('noofoccupants');
    this.noofrooms = this.navParams.get('noofrooms');
    // this.validate.fullname=this.user.fullname;
    //this.validate.nric=this.user.nric;
    // alert("Input from home page "+this.user.nric);

   
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ValidatePage');
  }
  next() {
    if (this.isnull(this.contactno)) {
      alert("Please Enter Your Contact No."); return;
    } else if (this.isnull(this.street)) {
      alert("Please Enter Street Name"); return;
    } else if (this.isnull(this.postalcode)) {
      alert("Please Enter Postal Code"); return;
    } else if (this.isnull(this.noofoccupants)) {
      alert("Please Enter No Of Occupants"); return;
    } else if (this.isnull(this.noofrooms)) {
      alert("Please Enter No Of Rooms"); return;
    } else {
      this.navCtrl.push(VerifyPage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms });
    }


  }
  isnull(value) {
    return !value;
  }
}
