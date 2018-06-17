import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { VerifyPage } from '../verify/verify';

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
user: User;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder) {
   // this.user=this.fb.group({username:['',Validators.required]});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ValidatePage');
  }
  next(){
   
       this.navCtrl.push(VerifyPage);
   
   }
}
