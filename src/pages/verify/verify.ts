import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { VerifysuccessPage } from '../verifysuccess/verifysuccess';
/**
 * Generated class for the VerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPage');
  
    this.presentLoading();
    
  }
  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Verifying your location'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.push(VerifysuccessPage);
    }, 2000);
  }
}
