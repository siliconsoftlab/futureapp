import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the SubmissionsuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-submissionsuccess',
  templateUrl: 'submissionsuccess.html',
})
export class SubmissionsuccessPage {
  rootPage:any = HomePage;
  constructor(private platform: Platform,public navCtrl: NavController, public navParams: NavParams) {
  }

  
  done(){
    this.navCtrl.push(HomePage);
  }
  ionViewDidLoad() {
    this.platform.ready().then(() => {
      let backAction = this. platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot(this.rootPage);
        backAction();
      },2)
  
    });


  }
  logout(){
    this.navCtrl.setRoot(HomePage);
  }

}
