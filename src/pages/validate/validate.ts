import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { VerifyPage } from '../verify/verify';
import { UserResponse } from '../UserResponse';
import { ValidateInput } from '../ValidateInput';



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

    // this.validate.fullname=this.user.fullname;
    //this.validate.nric=this.user.nric;
    // alert("Input from home page "+this.user.nric);


  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad ValidatePage');
  }
  next() {
   this.navCtrl.push(VerifyPage,{"nric":this.nric,"fullname":this.fullname,"contactno":this.contactno,"street":this.street,"unitno":this.unitno,"postalcode":this.postalcode,"noofoccupants":this.noofoccupants,"noofrooms":this.noofrooms});

  }
}
