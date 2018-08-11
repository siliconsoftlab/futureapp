import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SubmissionsuccessPage } from '../submissionsuccess/submissionsuccess';
import { ValidatePage } from '../validate/validate';
import { Base64 } from '@ionic-native/base64';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { SubmisssionRespose } from '../SumissionResponse';
import { LoadingController } from 'ionic-angular';
import { FinalInput } from '../FinalInput';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-viewconfirmation',
  templateUrl: 'viewconfirmation.html',
})
export class ViewconfirmationPage {
  address: any;
  nric: string;
  fullname: string;
  contactno: string;
  street: string;
  unitno: string;
  postalcode: string;
  noofoccupants: number;
  noofrooms: number;
  remainingtimeres: any;
  url: any = "http://homecheck.com.sg/submission.aspx";

  //This is for timer
  timeInSeconds: any;
  time: any;
  runTimer: any;
  hasStarted: any;
  hasFinished: any;
  remainingTime: number;
  displayTime: any;
  pausetime: any;
  restime: any;
  difftime: any;
  screenoff: boolean;
  maindoorpic: string;
  livingroompic: string;
  livingroom1pic: string;
  cmntoiletpic: string;
  kitchenpic: string;
  bedroom1pic: string;
  bedroom2pic: string;
  bedroombpic: string;
  bedroomcpic: string;
  bedroomdpic: string;
  loader: any;
  dob:Date;
  rent:number;
  public isThirdBedRoom: boolean;
  public isfourthBedRoom: boolean;
  public isrowVisbile: boolean;
  public base64Image: Array<string>;
  public ImageList: Array<FinalInput> = new Array<FinalInput>();
  public ImageListConverted: Array<FinalInput> = new Array<FinalInput>();
  public base64ImageConverted = new Array();
  subRes: SubmisssionRespose;
  public id:any;
  rootPage:any = HomePage;
  isprev:boolean=false;
  constructor(public loadingCtrl: LoadingController, private http: Http, private base64: Base64, private platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
   
    this.fullname = this.navParams.get('fullname');
    this.nric = this.navParams.get('nric');
    this.contactno = this.navParams.get('contactno');
    this.street = this.navParams.get('street');
    this.unitno = this.navParams.get('unitno');
    this.postalcode = this.navParams.get('postalcode');
    this.noofoccupants = this.navParams.get('noofoccupants');
    this.noofrooms = this.navParams.get('noofrooms');
    this.remainingtimeres = this.navParams.get('remainingtime');
    this.id=this.navParams.get('timer');
    this.dob = this.navParams.get('dob');
    this.rent = this.navParams.get('rent');
    this.ImageList = this.navParams.get('images');
   

    for (let img of this.ImageList ) {
      console.log(img.ImageTitle);
     console.log(img.ImageString);
    }
   
    if (this.noofrooms == 3 || this.noofrooms == 4) {
      this.isrowVisbile = true;
    } else {
      this.isrowVisbile = false;
    }

    if (this.noofrooms == 3) {
      this.isThirdBedRoom = true;
    } else if (this.noofrooms == 4) {
      this.isThirdBedRoom = true;
      this.isfourthBedRoom = true;
    } else {
      this.isThirdBedRoom = false;
      this.isfourthBedRoom = false;
    }


    this.maindoorpic = this.navParams.get('maindoorpic');
    this.livingroompic = this.navParams.get('livingroompic');
    this.kitchenpic = this.navParams.get('kitchenpic');
    this.bedroom1pic = this.navParams.get('bedroom1pic');
    this.bedroom2pic = this.navParams.get('bedroom2pic');
    this.bedroombpic = this.navParams.get('bedroombpic');


    this.livingroom1pic = this.navParams.get('livingroom1pic');
    this.cmntoiletpic = this.navParams.get('cmntoilet');
    this.bedroomcpic = this.navParams.get('bedroomcpic');
    this.bedroomdpic = this.navParams.get('bedroomdpic');




    this.initTimer(this.remainingtimeres);
    this.startTimer();
  }
  async getConverterImages(imageList:Array<FinalInput>) {
    let i: number = 0;
    let images: Promise<string>[] = [];
    for (let img of imageList) {

   await  this.base64.encodeFile(img.ImageString).then((base64File: string) => {
        // console.log(base64File);
        this.base64ImageConverted.push(base64File);
        let input= new FinalInput(img.ImageTitle,base64File);
        this.ImageListConverted.push(input);
        console.log("======================== > getConverterImages count " + i);
        i = i + 1;
      }, (err) => {
        console.log(err);
      });


      //alert(img);
    }

    console.log("======================== > getConverterImages end ");
    return Promise.all(this.ImageListConverted);

  }

 async next() {
    if (this.remainingTime > 0) {

      this.loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      this.loader.present();

      try {
        let successData = await this.getConverterImages(this.ImageList);
        console.log("successData "+successData);
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        headers.append('dataType', 'json')

        this.http.post(this.url, { "FinNo": this.nric, "FullName": this.fullname, "ContactNo": this.contactno, "StreetAdress": this.street, "UnitNo": this.unitno, "PostalCode": this.postalcode, "NoOfOccupants": this.noofoccupants, "NoOfBedrooms": this.noofrooms, "ImageList": successData ,"Dob":this.dob,"Rent":this.rent}, { headers: headers }).map(res => res.text()).subscribe(data => {
          // alert("success "+data);
          // alert(JSON.parse(data));
          console.log("JSON.parse(data) " + JSON.parse(data));
          console.log("data " + data);
          this.subRes = JSON.parse(data);

          if (this.subRes.status == "success") {
            this.loader.dismiss();
            // this.navCtrl.push(ValidatePage, { "data": this.usrres });
            // alert("submit successfully");
            this.navCtrl.push(SubmissionsuccessPage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms, "remainingtime": this.remainingTime, "maindoorpic": this.maindoorpic, "livingroompic": this.livingroompic, "kitchenpic": this.kitchenpic, "bedroom1pic": this.bedroom1pic, "bedroom2pic": this.bedroom2pic, "bedroombpic": this.bedroombpic,"dob":this.dob,"rent":this.rent  });
          } else {
            alert("Could not submit successfully");
            this.loader.dismiss();
            this.navCtrl.setRoot(this.rootPage);
          }


        }, (err) => {
          alert(err);
          this.loader.dismiss();

        }

        );


        
      } catch (error) {
        console.log(error);
      }


    /*  let successData = await this.getConverterImages(this.base64Image);
      this.getConverterImages(this.base64Image).then(data => {
        alert("second call");
        console.log("data " + data);
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        headers.append('dataType', 'json')

        this.http.post(this.url, { "FinNo": this.nric, "FullName": this.fullname, "ContactNo": this.contactno, "StreetAdress": this.street, "UnitNo": this.unitno, "PostalCode": this.postalcode, "NoOfOccupants": this.noofoccupants, "NoOfBedrooms": this.noofrooms, "ImageList": data }, { headers: headers }).map(res => res.text()).subscribe(data => {
          // alert("success "+data);
          // alert(JSON.parse(data));
          console.log("JSON.parse(data) " + JSON.parse(data));
          console.log("data " + data);
          this.subRes = JSON.parse(data);

          if (this.subRes.status == "success") {
            this.loader.dismiss();
            // this.navCtrl.push(ValidatePage, { "data": this.usrres });
            // alert("submit successfully");
            this.navCtrl.push(SubmissionsuccessPage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms, "remainingtime": this.remainingTime, "maindoorpic": this.maindoorpic, "livingroompic": this.livingroompic, "kitchenpic": this.kitchenpic, "bedroom1pic": this.bedroom1pic, "bedroom2pic": this.bedroom2pic, "bedroombpic": this.bedroombpic });
          } else {
            this.loader.dismiss();
            alert("Could not submit successfully");
          }


        }, (err) => {
          alert(err);
          this.loader.dismiss();

        }

        );





        
      }).catch(error => {
        alert("get converted error  ");
      });*/


      /*for(let img1 of this.base64ImageConverted){
        console.log("****** "+img1);
      }
        */










    } else {
      alert('Timed Out. You will have to verify your location and take pics again');
      this.navCtrl.setRoot(ValidatePage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms,"dob":this.dob,"rent":this.rent  });

    }
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {

      this.platform.resume.subscribe((e) => {

        this.restime = new Date();

        if (this.screenoff) {
          let timeDiff = this.restime - this.pausetime;
          this.difftime = timeDiff / 1000;
          this.remainingTime = this.remainingTime - this.difftime;
          this.screenoff = false;
          // alert(timeDiff);
        }
        // if we come back to the app and startCall was set by callNumber, we can assume we came back from a call

      });

      this.platform.pause.subscribe((e) => {
        // if we come back to the app and startCall was set by callNumber, we can assume we came back from a call
        this.screenoff = true;
        this.pausetime = new Date();

      });
    });


  }

  initTimer(remtime) {

    // Pomodoro is usually for 25 minutes
    if (!this.timeInSeconds) {
      this.timeInSeconds = remtime;
    }

    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;

    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }

  startTimer() {

    this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }

  pauseTimer() {
    this.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {


    


    setTimeout(() => {

      if (!this.runTimer) { return; }
      this.remainingTime--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      }
      else {
        this.hasFinished = true;
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    //return hoursString + ':' + minutesString + ':' + secondsString;
    return minutesString + ':' + secondsString;
  }
  fileUpload() {

  }
  prev() {
    this.isprev=true;
    console.log("=======================================> prev "+this.isprev);
    this.navCtrl.pop();
  }
  ionViewDidLeave() {
    if(this.isprev == false){
    console.log("=======================================> Time out cleared view confirmation");
    clearTimeout(this. id);}
        }
        logout(){
          clearTimeout(this. id);
          this.navCtrl.setRoot(HomePage);
        }
}
