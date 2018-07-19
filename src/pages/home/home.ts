import { Component } from '@angular/core';
import { NavController, Alert, AlertController, ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ValidatePage } from '../validate/validate';
import { InstructionsPage } from '../instructions/instructions';
import 'rxjs/add/operator/map'
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { User } from '../user';
import { UserResponse } from '../UserResponse';
import { TestProvider } from '../../providers/test/test'
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  /*fin: string;
  password: string;*/
  timeInSeconds: any;
  time: any;
  runTimer: any;
  hasStarted: any;
  hasFinished: any;
  remainingTime: any;
  displayTime: any;
  loader: any;
  upp:string
  fin: string ='G5415489P';
  password: string='1234';
  data: any;
  url: any = "http://futureapp.pixart.com.sg/login.aspx";
  user: User = { "username": "admin", "password": "aaaa" };
  // userRes: UserResponse = { "nric": "G564638D", "fullname": "Xu Xia", "company": "", "jobtitle": "", "loginstatus": "success" };

  usrres: UserResponse;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private http: Http, private testService: TestProvider, private alertCtrl: AlertController, private mctrl: ModalController,private statusBar: StatusBar) {
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#EC8924');
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    //alert("FIN "+ this.fin+" Password "+this.password);
    // this.presentLoading();
    // this.navCtrl.push(ValidatePage);
    //  this.login();
    this.testService.getData().then(result => {
      // alert(result); console.log("result: "+result);
    });
  }

  login() {

    // alert("is null "+this.isnull(this.fin));
    // alert("FIN "+ this.fin+" Password "+this.password);
    // alert(" login inside");

    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });


    if (this.isnull(this.fin)) {
      // this.presentAlert();


      let alert = this.alertCtrl.create({
        title: '<div>Invalid Credential</div>',
        subTitle: '<div>Please Enter Your FinNo.</div>',
        buttons: ['OK'],
        enableBackdropDismiss: false
      });
      alert.present();

      return;
    } else if (this.isnull(this.password)) {


      let alert = this.alertCtrl.create({
        title: '<div>Invalid Credential</div>',
        subTitle: '<div>Please Enter Your Password.</div>',
        buttons: ['OK'],
        enableBackdropDismiss: false
      });
      alert.present();
      return;
    } else {
      this.loader.present();
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept', 'application/json');
      headers.append('content-type', 'application/json');
      headers.append('dataType', 'json')

console.log(this.fin.toUpperCase);
//alert(this.fin.toUpperCase);

      /*   this.http.post(this.url, this.user).subscribe(result => {
          alert("last");
          console.log("result " + result);
          console.log("result " + result.json());
          this.weather = result.json();
          alert("last");
      });*/


      /*  this.http.get('http://192.168.1.34:8080/suyamvaram/v1/test').map(res => res.json()).subscribe(data => {
          alert("suyamvaram");
          alert("username " + data);
          this.userRes = data;
          console.log("this.userRes " + data);
          // alert("loginstatus "+this.userRes.loginstatus);
    
        });*/

      this.http.post(this.url, { "username": this.fin, "password": this.password }, { headers: headers }).map(res => res.text()).subscribe(data => {

        //alert("success "+data);


        this.usrres = JSON.parse(data);
        console.log("this.userRes " + data);

        //alert("loginstatus "+data);
        if (this.usrres.loginstatus == "success") {
          this.loader.dismiss();
          // this.navCtrl.push(ValidatePage, { "data": this.usrres });
          this.navCtrl.push(ValidatePage, { "nric": this.usrres.fullname, "fullname": this.usrres.nric });

        } else {
          this.loader.dismiss();
          alert("Invalid Username/Password");
        }

      });


      /*  this.http.post(this.url, this.user, { headers: headers}).map(res=> JSON.stringify(res)).subscribe(data=>{
          // alert("text");
           //alert("success "+data);
         
           console.log("this.userRes "+data);
          // alert("loginstatus "+data);
         
          });*/
    }
  }



  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
  }



  isnull(value) {
    return !value;
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '<div id=one> Instructions on photo taking</div><div  id="two"> for</div><div id="three">LIVING ROOM  1</div>',
      subTitle: '<div no-margin text-center>Lorem ipsum dolor sit amet,</div> <div no-margin text-center>consectetur adipiscing elit, Aenean</div>   <div no-margin text-center>aliquet molestie odio, vitae ornare.</div>    <div no-margin text-center>Lorem ipsum dolor sit amet,</div>   <div no-margin text-center>consectetur adipiscing elit, Aenean</div>    <div no-margin text-center>aliquet molestie odio.</div>',
      buttons: ['OK'],
      enableBackdropDismiss: false
    });
    alert.present();
  }
}
interface Weather {
  nric: string;
  fullname: string;
  company: string;
  jobtitle: string;
  loginstatus: string;
}