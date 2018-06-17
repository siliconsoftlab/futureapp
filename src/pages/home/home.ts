import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ValidatePage } from '../validate/validate';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fin: any;
  password: any;
  constructor(public navCtrl: NavController,public loadingCtrl:LoadingController) {

  }
  login(){
   // alert("FIN "+ this.fin+" Password "+this.password);
     // this.presentLoading();
      this.navCtrl.push(ValidatePage);
  
  }
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }
}
