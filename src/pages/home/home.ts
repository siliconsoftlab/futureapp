import { Component } from '@angular/core';
import { NavController, Alert, AlertController, ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ValidatePage } from '../validate/validate';

import 'rxjs/add/operator/map'
import { Http, Response } from '@angular/http';
import { HTTP } from '@ionic-native/http';

import { Headers, RequestOptions } from '@angular/http';
import { User } from '../user';
import { UserResponse } from '../UserResponse';
import { TestProvider } from '../../providers/test/test'
import { StatusBar } from '@ionic-native/status-bar';


import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fin: string;
  password: string;
  timeInSeconds: any;
  time: any;
  runTimer: any;
  hasStarted: any;
  hasFinished: any;
  remainingTime: any;
  displayTime: any;
  loader: any;
  upp:string
 /* fin: string ='F2448994U';
  password: string='123456';*/
  data: any;
  url: any = "http://homecheck.com.sg/login.aspx";
  user: User = { "username": "admin", "password": "aaaa" };
  isEng:boolean=false;
  isCh:boolean=true;
  // userRes: UserResponse = { "nric": "G564638D", "fullname": "Xu Xia", "company": "", "jobtitle": "", "loginstatus": "success" };

  usrres: UserResponse;
  lang:any;
  invalidinput:any;
  FINNO:any;
  ENTERYOURXXXX:any;
  PASSWORD:any;
  OK:any;
  INVALIDUSERNAMEPASSWORD:any;
  INVALIDREQUEST:any;
  constructor(public translate: TranslateService,private http: HTTP,public navCtrl: NavController, public loadingCtrl: LoadingController, private httpangular: Http, private testService: TestProvider, private alertCtrl: AlertController, private mctrl: ModalController,private statusBar: StatusBar) {
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#EC8924');
    this.translate.use('en');

   

    this.testService.getData().then(result => {
      // alert(result); console.log("result: "+result);
    });
  }
 
  /*setLanguage(){
    let defaultLanguage = this.translate.getDefaultLang();
    if(this.languageSelected){
      this.translate.setDefaultLang(this.languageSelected);
      this.translate.use(this.languageSelected);
    }else{
      this.languageSelected = defaultLanguage;
      this.translate.use(defaultLanguage);
    }
  }*/
  login() {

    // alert("is null "+this.isnull(this.fin));
    // alert("FIN "+ this.fin+" Password "+this.password);
    // alert(" login inside");

    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    this.invalidinput = this.translate.get('INVALIDINPUT');
    this.translate.get('INVALIDINPUT').subscribe(res => { this.invalidinput = res; });

    this.FINNO = this.translate.get('FIN NO');
    this.translate.get('FIN NO').subscribe(res => { this.FINNO = res; });

    this.PASSWORD = this.translate.get('PASSWORD');
    this.translate.get('PASSWORD').subscribe(res => { this.PASSWORD = res; });

    this.ENTERYOURXXXX = this.translate.get('ENTERYOURXXXX');
    this.translate.get('ENTERYOURXXXX').subscribe(res => { this.ENTERYOURXXXX = res; });

    this.OK = this.translate.get('OK');
    this.translate.get('OK').subscribe(res => { this.OK = res; });


    
    if (this.isnull(this.fin)) {
      // this.presentAlert();
      




      let alert = this.alertCtrl.create({
        title: `<div>${this.invalidinput}</div>`,
        subTitle: `<div>${this.ENTERYOURXXXX}${this.FINNO}</div>`,
        buttons: [`${this.OK}`],
        enableBackdropDismiss: false
      });
      alert.present();

      return;
    } else if (this.isnull(this.password)) {


      let alert = this.alertCtrl.create({
        title: `<div>${this.invalidinput}</div>`,
        subTitle: `<div>${this.ENTERYOURXXXX}${this.PASSWORD}</div>`,
        buttons: [`${this.OK}`],
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

   
      this.http.setDataSerializer('json');
      this.http.post(this.url, { "username": this.fin, "password": this.password }, { }).then(data => {
       // alert("success "+data);
      /* console.log("data  " +data);
       console.log("data.data  " +data.data);
       console.log("JSON.parse(data.data)" +JSON.parse(data.data));
       console.log("JSON.stringify( data.data)" +JSON.stringify( data.data));
      
      
      alert("data  " +data);
      alert("data.data  " +data.data);
      alert("JSON.parse(data.data)" +JSON.parse(data.data));
      alert("JSON.stringify( data.data)" +JSON.stringify( data.data));*/


        this.usrres = JSON.parse(data.data);
        console.log("this.userRes " +data.data);
       // alert("this.userRes " +this.usrres);
        //alert("this.userRes.loginstatus " +this.usrres.loginstatus);
        //alert("this.userRes.company " +this.usrres.company);

        //alert("this.userRes.fullname " +this.usrres.fullname);
        //alert("this.userRes.jobtitle " +this.usrres.jobtitle);
        //alert("this.userRes.nric " +this.usrres.nric);
        //alert("loginstatus "+data);
        if (this.usrres.loginstatus == "success") {
          this.loader.dismiss();
          // this.navCtrl.push(ValidatePage, { "data": this.usrres });
          this.navCtrl.push(ValidatePage, { "nric": this.usrres.fullname, "fullname": this.usrres.nric });
        } else if(this.usrres.loginstatus == "fail"){
          this.loader.dismiss();
   
        this.INVALIDUSERNAMEPASSWORD = this.translate.get('INVALIDUSERNAMEPASSWORD');
        this.translate.get('INVALIDUSERNAMEPASSWORD').subscribe(res => { this.INVALIDUSERNAMEPASSWORD = res; });

          let alert = this.alertCtrl.create({
            title: `<div>${this.invalidinput}</div>`,
            subTitle: `<div>${this.INVALIDUSERNAMEPASSWORD}</div>`,
            buttons: [`${this.OK}`],
            enableBackdropDismiss: false
          });
          alert.present();

        }else if(this.usrres.loginstatus == "fail2"){
          this.loader.dismiss();
   
          this.INVALIDREQUEST = this.translate.get('INVALIDREQUEST');
          this.translate.get('INVALIDREQUEST').subscribe(res => { this.INVALIDREQUEST = res; });
                      let alert = this.alertCtrl.create({
                  title: `<div>${this.invalidinput}</div>`,
                  subTitle: `<div>${this.INVALIDREQUEST}</div>`,
                  buttons: [`${this.OK}`],
                  enableBackdropDismiss: false
                });
                alert.present();

        }
      }).catch(err=>{
        alert('err');
      });
    
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
  eng(){
   



this.isEng=false;
this.isCh=true;
  this.translate.setDefaultLang('en');
  this.translate.use('en');
  }
  chi(){
    this.isEng=true;
    this.isCh=false;
    //this. translate.use('zh-cn');
   
    this.translate.setDefaultLang('zh-cn');
    this.translate.use('zh-cn');
  }
}
interface Weather {
  nric: string;
  fullname: string;
  company: string;
  jobtitle: string;
  loginstatus: string;
}