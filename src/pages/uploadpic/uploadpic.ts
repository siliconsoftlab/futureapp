import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewconfirmationPage } from '../viewconfirmation/viewconfirmation';
import { ValidatePage } from '../validate/validate';
import { TimerProvider } from '../../providers/timer/timer';
/**
 * Generated class for the UploadpicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uploadpic',
  templateUrl: 'uploadpic.html',
})
export class UploadpicPage {

  address: any;
  nric: string;
  fullname: string;
  contactno: string;
  street: string;
  unitno: string;
  postalcode: string;
  noofoccupants: number;
  noofrooms: number;

  public maindoor: string = 'MAIN DOOR';
  public livingroom: string = 'LIVING ROOM 1';
  public livingroom1: string = 'LIVING ROOM 2';
  public kitchen: string = 'KITCHEN';
  public cmntoilet: string = 'COMMON TOILET';
  public bedroom1: string = 'MY BEDROOM1';
  public bedroom2: string = 'MY BEDROOM2';
  public bedroomb: string = 'BEDROOM B';
  public bedroomc: string = 'BEDROOM C';
  public bedroomd: string = 'BEDROOM D';
  mypic: string;


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

  //This is for timer
  timeInSeconds: any;
  time: any;
  runTimer: any;
  hasStarted: any;
  hasFinished: any;
  remainingTime: number;
  displayTime: any;

  tilemsg: string;
  contentmsg: string;
  pictype: string;
  alert: any;


  public isThirdBedRoom: boolean;
  public isfourthBedRoom: boolean;
  public isrowVisbile: boolean;



  public base64Image: string[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private sanitizer: DomSanitizer, private alertCtrl: AlertController, private timer: TimerProvider) {
    this.base64Image = new Array();
    this.fullname = this.navParams.get('fullname');
    this.nric = this.navParams.get('nric');
    this.contactno = this.navParams.get('contactno');
    this.street = this.navParams.get('street');
    this.unitno = this.navParams.get('unitno');
    this.postalcode = this.navParams.get('postalcode');
    this.noofoccupants = this.navParams.get('noofoccupants');
    this.noofrooms = this.navParams.get('noofrooms');

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

    this.initTimer();
    this.startTimer();
  }
  presentAlert(titmsg,submsg) {
    
  let alert = this.alertCtrl.create({
    title: '<div> Instructions on photo taking</div><div> for</div><div>{{titmsg}}</div>',
    subTitle: '<div no-margin text-center>Lorem ipsum dolor sit amet,</div> <div no-margin text-center>consectetur adipiscing elit, Aenean</div>   <div no-margin text-center>aliquet molestie odio, vitae ornare.</div>    <div no-margin text-center>Lorem ipsum dolor sit amet,</div>   <div no-margin text-center>consectetur adipiscing elit, Aenean</div>    <div no-margin text-center>aliquet molestie odio.</div>',
    buttons: ['OK'],
    enableBackdropDismiss: false
  });
  alert.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadpicPage');
  }

  takePicture(pic) {

    if(this.remainingTime==0){
      let alert = this.alertCtrl.create({
        title: '<div> Your time is up.</div>',
        subTitle: '<div>Sorry, you have to complete the photo </div><div>taking and submission with 3 mins.</div><div>Please start again from Step1.</div>',
        buttons: ['Re-enter Details'],
        enableBackdropDismiss: false
      });
      alert.present();
      this.navCtrl.setRoot(ValidatePage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms });
      return;
    }
    switch (pic) {
      case this.maindoor:
        this.tilemsg = 'Main Door';
        this.contentmsg = 'Main door Instructions'
        break;
      case this.livingroom:
        this.tilemsg = 'Livingroom Pic 1';
        this.contentmsg = 'Livingroom Instructions'
        break;
      case this.livingroom1:
        this.tilemsg = 'Livingroom Pic 2';
        this.contentmsg = 'Livingroom Instructions'
        break;
      case this.cmntoilet:
        this.tilemsg = 'Common Toilet ';
        this.contentmsg = 'Common Toilet Instructions'
        break;
      case this.kitchen:
        this.tilemsg = 'kitchen';
        this.contentmsg = 'Kitchen Instructions'
        break;
      case this.bedroom1:
        this.tilemsg = 'My Bedroom Pic 1';
        this.contentmsg = 'My Bedroom Pic 1 Instructions'
        break;
      case this.bedroom2:
        this.tilemsg = 'My Bedroom Pic 2';
        this.contentmsg = 'My Bedroom Pic 2 Instructions'
        break;
      case this.bedroomb:
        this.tilemsg = 'Bedroom B';
        this.contentmsg = 'Bedroom B Instructions'
        break;
      case this.bedroomc:
        this.tilemsg = 'Bedroom C';
        this.contentmsg = 'Bedroom C Instructions'
        break;
      case this.bedroomd:
        this.tilemsg = 'Bedroom D';
        this.contentmsg = 'Bedroom D Instructions'
        break;

    }


   /* this.alert = this.alertCtrl.create({
      title: this.tilemsg,
      message: this.contentmsg,
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          handler: () => {
            console.log('Cancel clicked');
            this.takePicture11(pic);
          }
        }
      ]
    });*/


    this. alert = this.alertCtrl.create({
      title: `<div id=one> Instructions on photo taking</div><div  id="two"> for</div><div id="three">${this.tilemsg}</div>`,
      subTitle: '<div no-margin text-center>Lorem ipsum dolor sit amet,</div> <div no-margin text-center>consectetur adipiscing elit, Aenean</div>   <div no-margin text-center>aliquet molestie odio, vitae ornare.</div>    <div no-margin text-center>Lorem ipsum dolor sit amet,</div>   <div no-margin text-center>consectetur adipiscing elit, Aenean</div>    <div no-margin text-center>aliquet molestie odio.</div>',
     buttons: [
        {
          text: 'OK',
          role: 'ok',
          handler: () => {
            console.log('Cancel clicked');
            this.takePicture11(pic);
          }
        }
      ],
      enableBackdropDismiss: false
    });
    this.alert.present();



   // this.alert.present();
  }
  takePicture11(pic) {

    this.pictype = pic;
    //this.presentConfirm();
    // alert(pic);
    //console.log(pic);
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageUri) => {
      //  alert("Success");
      console.log("imageUri " + imageUri);
      this.base64Image.push(imageUri);
      this.mypic = imageUri;
      let imageUris = this.base64Image.map(o => o).join(',');
      console.log("imageUris is " + imageUris);
      // this.mypic =this.sanitizer.bypassSecurityTrustUrl(  'data:image/jpeg;base64,' + imageUri);

      if (this.pictype == this.maindoor) {
        this.maindoorpic = imageUri;
        console.log("From If this.maindoorpic" + this.maindoorpic);
      } else if (this.pictype == this.livingroom) {
        this.livingroompic = imageUri;
        console.log("From If this.livingroompic" + this.livingroompic);
      } else if (this.pictype == this.livingroom1) {
        this.livingroom1pic = imageUri;
        console.log("From If this.livingroompic" + this.livingroom1pic);
      } else if (this.pictype == this.cmntoilet) {
        this.cmntoiletpic = imageUri;
        console.log("From If this.livingroompic" + this.cmntoiletpic);
      }
      else if (this.pictype == this.kitchen) {
        this.kitchenpic = imageUri;
        console.log("From If this.kitchenpic" + this.kitchenpic);
      }
      else if (this.pictype == this.bedroom1) {
        this.bedroom1pic = imageUri;
        console.log("From If this.bedroom1pic " + this.bedroom1pic);
      }
      else if (this.pictype == this.bedroom2) {
        this.bedroom2pic = imageUri;
        console.log("From If this.bedroom2pic " + this.bedroom2pic);
      }
      else if (this.pictype == this.bedroomb) {
        this.bedroombpic = imageUri;
        console.log("From If  this.bedroombpic" + this.bedroombpic);
      }
      else if (this.pictype == this.bedroomc) {
        this.bedroomcpic = imageUri;
        console.log("From If this.bedroomcpic " + this.bedroomcpic);
      }
      else if (this.pictype == this.bedroomd) {
        this.bedroomdpic = imageUri;
        console.log("From If this.bedroomdpic" + this.bedroomdpic);
      }


    

     // console.log(" this.maindoorpic " + this.maindoorpic);
      console.log(" this.livingroompic " + this.livingroompic);
      console.log("  this.kitchenpic " + this.kitchenpic);
      console.log(" this.bedroom1pic  " + this.bedroom1pic);
      console.log("this.bedroom2pic " + this.bedroom2pic);
      console.log("this.bedroombpic  " + this.bedroombpic);






    }, (err) => {
      console.log("Caqmera err " + err);
    });
  }


  next() {

    if (this.remainingTime > 0) {

      if (this.isnull(this.maindoorpic)) {
        alert("Please take main door pic");
        return;
      } else if (this.isnull(this.livingroompic)) {
        alert("Please take  livingroompic pic");
        return;
      } else if (this.isnull(this.livingroom1pic)) {
        alert("Please take  livingroom1pic pic");
        return;
      } else if (this.isnull(this.cmntoiletpic)) {
        alert("Please take common toilet pic");
        return;
      } else if (this.isnull(this.kitchenpic)) {
        alert("Please take kitchen pic");
        return;
      } else if (this.isnull(this.bedroom1pic)) {
        alert("Please take bedroom1 pic");
        return;
      } else if (this.isnull(this.bedroom2pic)) {
        alert("Please take bedroom2 pic");
        return;
      } else if (this.isnull(this.bedroombpic)) {
        alert("Please take bedroomb pic");
        return;
      }

      if (this.isThirdBedRoom && this.isnull(this.bedroomcpic)) {
        alert("Please take bedroomc pic");
        return;
      }
      if (this.isfourthBedRoom && this.isnull(this.bedroomdpic)) {
        alert("Please take bedroomd pic");
        return;
      }

      this.navCtrl.push(ViewconfirmationPage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms, "remainingtime": this.remainingTime, "maindoorpic": this.maindoorpic, "livingroompic": this.livingroompic, "kitchenpic": this.kitchenpic, "bedroom1pic": this.bedroom1pic, "bedroom2pic": this.bedroom2pic, "bedroombpic": this.bedroombpic, "livingroom1pic": this.livingroom1pic, "cmntoilet": this.cmntoiletpic, "bedroomcpic": this.bedroomcpic, "bedroomdpic": this.bedroomdpic });
    } else {
     
      let alert = this.alertCtrl.create({
        title: '<div> Your time is up.</div>',
        subTitle: '<div>Sorry, you have to complete the photo </div><div>taking and submission with 3 mins.</div><div>Please start again from Step1.</div>',
        buttons: ['Re-enter Details'],
        enableBackdropDismiss: false
      });
      alert.present();

      this.navCtrl.setRoot(ValidatePage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms });

    }

  }
  prev() {
    this.navCtrl.setRoot(ValidatePage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms });
  }


  initTimer() {

    // Pomodoro is usually for 25 minutes
    if (!this.timeInSeconds) {
      // this.timeInSeconds = 300;
      this.timeInSeconds = 60;
     // this.startCount(this.timeInSeconds);
     setTimeout(() => 
     {
      let alert = this.alertCtrl.create({
        title: '<div> Your time is up.</div>',
        subTitle: '<div>Sorry, you have to complete the photo </div><div>taking and submission with 3 mins.</div><div>Please start again from Step1.</div>',
        buttons: ['Re-enter Details'],
        enableBackdropDismiss: false
      });
      alert.present();

      this.navCtrl.setRoot(ValidatePage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms });
      return;
     },
     60000);

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
startCount(timeInSeconds){


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
  isnull(value) {
    return !value;
  }

}
