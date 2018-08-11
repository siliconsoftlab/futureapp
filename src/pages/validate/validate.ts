import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { VerifyPage } from '../verify/verify';
import { UserResponse } from '../UserResponse';
import { ValidateInput } from '../ValidateInput';
import { HomePage } from '../home/home';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'page-validate',
  templateUrl: 'validate.html',
})
export class ValidatePage {
  user: UserResponse;
  validate: ValidateInput;
  nric: string;
  fullname: string;

   contactno: string='98718177';
   street: string='Lorong 4 Geylang';
   unitno: string='47a';
   postalcode: string='399291';
   noofoccupants: number=10;
   noofrooms: number=3;
   dob:Date;
   rent:number;
  userRes: UserResponse;
  invalidinput:any;
  OK:any;
  ENTERYOURXXXX:any;
  CONTACTNO:any;
  STREET:any;
  POSTALCODE:any;
  NOOFOCCUPANTS:any;
  NOOFROOMS:any;
  DOBPH:any
  RENTPH:any
  
  constructor(public translate: TranslateService,private statusBar: StatusBar,public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder,private alertCtrl:AlertController) {
    console.log('========================>constructor start');
    // this.user=this.fb.group({username:['',Validators.required]});
    // this.userRes=this.navParams.get('data');
    this.statusBar.overlaysWebView(true);

    // set status bar to white
    this.statusBar.backgroundColorByHexString('#EC8924');
    this.fullname = this.navParams.get('nric');
    this.nric = this.navParams.get('fullname');
    this.contactno = this.navParams.get('contactno');
    this.street = this.navParams.get('street');
    this.unitno = this.navParams.get('unitno');
    this.postalcode = this.navParams.get('postalcode');
    this.noofoccupants = this.navParams.get('noofoccupants');
    this.noofrooms = this.navParams.get('noofrooms');
    this.dob = this.navParams.get('dob');
    this.rent = this.navParams.get('rent');


    this.DOBPH = this.translate.get('DOB');
    this.translate.get('DOB').subscribe(res => { this.DOBPH = res; });


    this.RENTPH = this.translate.get('RENT');
    this.translate.get('RENT').subscribe(res => { this.RENTPH = res; });


    this.invalidinput = this.translate.get('INVALIDINPUT');
    this.translate.get('INVALIDINPUT').subscribe(res => { this.invalidinput = res; });

    this.ENTERYOURXXXX = this.translate.get('ENTERYOURXXXX');
    this.translate.get('ENTERYOURXXXX').subscribe(res => { this.ENTERYOURXXXX = res; });

    this.OK = this.translate.get('OK');
    this.translate.get('OK').subscribe(res => { this.OK = res; });

    
    this.CONTACTNO = this.translate.get('CONTACTNO');
    this.translate.get('CONTACTNO').subscribe(res => { this.CONTACTNO = res; });

    this.STREET = this.translate.get('STREET');
    this.translate.get('STREET').subscribe(res => { this.STREET = res; });

    this.POSTALCODE = this.translate.get('POSTALCODE');
    this.translate.get('POSTALCODE').subscribe(res => { this.POSTALCODE = res; });
   
    this.NOOFOCCUPANTS = this.translate.get('NOOFOCCUPANTS');
    this.translate.get('NOOFOCCUPANTS').subscribe(res => { this.NOOFOCCUPANTS = res; });
    
    this.NOOFROOMS = this.translate.get('NOOFROOMS');
    this.translate.get('NOOFROOMS').subscribe(res => { this.NOOFROOMS = res; });
    
    

  /* this.contactno = '98718177';
    this.street = 'Lorong 4 Geylang';
    this.unitno = '47a';
    this.postalcode ='399291';
    this.noofoccupants = 10;
    this.noofrooms = 2;*/
 

    console.log('========================>constructor end');
  }

  ionViewDidLoad() {
   console.log('========================>ionViewDidLoad ValidatePage');
  }
  next() {
    if (this.isnull(this.contactno)) {
    
      let alert = this.alertCtrl.create({
        title: `<div>${this.invalidinput}</div>`,
        subTitle: `<div>${this.ENTERYOURXXXX}${this.CONTACTNO}</div>`,
        buttons: [`${this.OK}`],
        enableBackdropDismiss: false
      });
      alert.present();

      return;

     
    } else if (this.isnull(this.street)) {
     
      let alert = this.alertCtrl.create({
        title: `<div>${this.invalidinput}</div>`,
        subTitle: `<div>${this.ENTERYOURXXXX}${this.STREET}</div>`,
        buttons: [`${this.OK}`],
        enableBackdropDismiss: false
      });
      alert.present();

      return;
    } else if (this.isnull(this.postalcode)) {
    
      let alert = this.alertCtrl.create({
        title: `<div>${this.invalidinput}</div>`,
        subTitle: `<div>${this.ENTERYOURXXXX}${this.POSTALCODE}</div>`,
        buttons: [`${this.OK}`],
        enableBackdropDismiss: false
      });
      alert.present();

      return;
    } else if (this.isnull(this.noofoccupants)) {
     
      let alert = this.alertCtrl.create({
        title: `<div>${this.invalidinput}</div>`,
        subTitle: `<div>${this.ENTERYOURXXXX}${this.NOOFOCCUPANTS}</div>`,
        buttons: [`${this.OK}`],
        enableBackdropDismiss: false
      });
      alert.present();

      return;
    } else if (this.isnull(this.noofrooms)) {
    
      let alert = this.alertCtrl.create({
        title: `<div>${this.invalidinput}</div>`,
        subTitle: `<div>${this.ENTERYOURXXXX}${this.NOOFROOMS}</div>`,
        buttons: [`${this.OK}`],
        enableBackdropDismiss: false
      });
      alert.present();

      return;
    }else if (this.isnull(this.dob)) {
    
      let alert = this.alertCtrl.create({
        title: `<div>${this.invalidinput}</div>`,
        subTitle: `<div>${this.ENTERYOURXXXX}${this.DOBPH}</div>`,
        buttons: [`${this.OK}`],
        enableBackdropDismiss: false
      });
      alert.present();

      return;
    }else if (this.isnull(this.rent)) {
    
      let alert = this.alertCtrl.create({
        title: `<div>${this.invalidinput}</div>`,
        subTitle: `<div>${this.ENTERYOURXXXX}${this.RENTPH}</div>`,
        buttons: [`${this.OK}`],
        enableBackdropDismiss: false
      });
      alert.present();

      return;
    }
    
    
    
    else {
      
      this.navCtrl.push(VerifyPage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms,"dob":this.dob,"rent":this.rent });
    }


  }
  isnull(value) {
    return !value;
  }
  logout(){
    this.navCtrl.setRoot(HomePage);
  }
}
