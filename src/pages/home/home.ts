import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ValidatePage } from '../validate/validate';

import 'rxjs/add/operator/map'
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { User } from '../user';
import { UserResponse } from '../UserResponse';
import { resolveDefinition } from '@angular/core/src/view/util';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fin: string;
  password: string;
  data: any;
  url: any = "http://futureapp.pixart.com.sg/login.aspx";
  user: User = { "username": "admin", "password": "aaaa" };
 // userRes: UserResponse = { "nric": "G564638D", "fullname": "Xu Xia", "company": "", "jobtitle": "", "loginstatus": "success" };
  loader = this.loadingCtrl.create({
  content: "Please wait...",      
});
  usrres: UserResponse;
  
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private http: Http) {
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
  
      //alert("FIN "+ this.fin+" Password "+this.password);
    // this.presentLoading();
    // this.navCtrl.push(ValidatePage);
    //  this.login();

  }
 
  login() {
   this. loader.present();
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
     headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
     headers.append('Accept', 'application/json');
     headers.append('content-type', 'application/json');
     headers.append('dataType','json')
   



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

    this.http.post(this.url, { "username":this.fin, "password": this.password }, { headers: headers}).map(res=>res.text()).subscribe(data=>{
   
     //alert("success "+data);
   
    
     this.usrres = JSON.parse(data);
     console.log("this.userRes "+data);
  
    //alert("loginstatus "+data);
if(this.usrres.loginstatus=="success"){
  this. loader.dismiss();
  this.navCtrl.push(ValidatePage, { "data": this.usrres });
}else{
  this. loader.dismiss();
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




  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",      
    });
    loader.present();
  }
}
interface Weather {
  nric: string;
  fullname: string;
  company: string;
  jobtitle: string;
  loginstatus: string;
}