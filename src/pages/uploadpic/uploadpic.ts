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
  public livingroom: string = 'LIVING ROOM';
  public livingroom1: string = 'LIVING ROOM 2';
  public kitchen: string = 'KITCHEN';
  public cmntoilert: string = 'Common toilet';
  public bedroom1: string = 'MY BEDROOM1';
  public bedroom2: string = 'MY BEDROOM2';
  public bedroomb: string = 'BEDROOM B';
  public bedroomc: string = 'BEDROOM C';
  public bedroomd: string = 'BEDROOM D';
  mypic: string;
  maindoorpic: string;
  livingroompic: string;
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
   alert:any;
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
    this.initTimer();
    this.startTimer();
  }
  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Instruction',
      subTitle: message,
      buttons: ['OK'],
      enableBackdropDismiss: false 
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadpicPage');
  }

  takePicture(pic) {

    switch (pic) {
      case this.maindoor:
        this.tilemsg = 'Main Door';
        this.contentmsg = 'Main door Instructions'
        break;
      case this.livingroom:
        this.tilemsg = 'Livingroom ';
        this.contentmsg = 'Livingroom Instructions'
        break;
      case this.kitchen:
        this.tilemsg = 'kitchen';
        this.contentmsg = 'Kitchen Instructions'
        break;
      case this.bedroom1:
        this.tilemsg = 'Bedroom A 1';
        this.contentmsg = 'Bedroom A 1 Instructions'
        break;
      case this.bedroom2:
        this.tilemsg = 'Bedroom A 2';
        this.contentmsg = 'Bedroom A 2 Instructions'
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
    this. alert = this.alertCtrl.create({
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
    });
    this.alert.present();
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

      if (this.pictype == 'MAIN DOOR') {
        this.maindoorpic =  imageUri;
        console.log("From If this.maindoorpic" + this.maindoorpic);
      } else if (this.pictype == 'LIVING ROOM') {
        this.livingroompic =  imageUri;
        console.log("From If this.livingroompic" + this.livingroompic);
      } else if (this.pictype == 'KITCHEN') {
        this.kitchenpic = imageUri;
        console.log("From If this.kitchenpic" + this.kitchenpic);
      }
      else if (this.pictype == 'MY BEDROOM1') {
        this.bedroom1pic =  imageUri;
        console.log("From If this.bedroom1pic " + this.bedroom1pic);
      }
      else if (this.pictype == 'MY BEDROOM2') {
        this.bedroom2pic = imageUri;
        console.log("From If this.bedroom2pic " + this.bedroom2pic);
      }
      else if (this.pictype == 'BEDROOM B') {
        this.bedroombpic =  imageUri;
        console.log("From If  this.bedroombpic" + this.bedroombpic);
      }
      else if (this.pictype == 'BEDROOM C') {
        this.bedroomcpic =  imageUri;
        console.log("From If this.bedroomcpic " + this.bedroomcpic);
      }
      else if (this.pictype == 'BEDROOM D') {
        this.bedroomdpic =  imageUri;
        console.log("From If this.bedroomdpic" + this.bedroomdpic);
      }


      /*  switch (pic) {
          case 'MAIN DOOR':
            this.maindoorpic = 'data:image/jpeg;base64,' + imageUri;
            console.log(this.maindoorpic);
            break;
          case 'LIVING ROOM':
            this.livingroompic = 'data:image/jpeg;base64,' + imageUri;
            console.log(this.livingroompic);
            // alert(this.livingroom);
            break;
          case this.kitchen:
            this.kitchenpic = 'data:image/jpeg;base64,' + imageUri;
            console.log(this.kitchenpic);
  
            break;
          case this.bedroom1:
            this.bedroom1pic = 'data:image/jpeg;base64,' + imageUri;
            console.log(this.bedroom1pic);
            //alert(this.bedroom1);
            break;
          case this.bedroom2:
            this.bedroom2pic = 'data:image/jpeg;base64,' + imageUri;
            console.log(this.bedroom2pic);
            break;
          case this.bedroomb:
            this.bedroombpic = 'data:image/jpeg;base64,' + imageUri;
            console.log(this.bedroombpic);
            break;
          case this.bedroomc:
            this.bedroomcpic = 'data:image/jpeg;base64,' + imageUri;
            console.log(this.maindoorpic);
            break;
          case this.bedroomd:
            this.bedroomdpic = 'data:image/jpeg;base64,' + imageUri;
            console.log(this.bedroomdpic);
            break;
  
        }*/

      console.log(" this.maindoorpic " + this.maindoorpic);
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
  
    if(this.remainingTime>0){
          this.navCtrl.push(ViewconfirmationPage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms, "remainingtime": this.remainingTime, "maindoorpic": this.maindoorpic , "livingroompic": this.livingroompic , "kitchenpic": this.kitchenpic , "bedroom1pic": this.bedroom1pic , "bedroom2pic": this.bedroom2pic , "bedroombpic": this.bedroombpic  });
    }else{
      alert('Timed Out. You will have to verify your location again');
      this.navCtrl.setRoot(ValidatePage,{"nric":this.nric,"fullname":this.fullname,"contactno":this.contactno,"street":this.street,"unitno":this.unitno,"postalcode":this.postalcode,"noofoccupants":this.noofoccupants,"noofrooms":this.noofrooms});
     
    }
   
  }
  prev() {
    this.navCtrl.setRoot(ValidatePage,{"nric":this.nric,"fullname":this.fullname,"contactno":this.contactno,"street":this.street,"unitno":this.unitno,"postalcode":this.postalcode,"noofoccupants":this.noofoccupants,"noofrooms":this.noofrooms});
  }


  initTimer() {

    // Pomodoro is usually for 25 minutes
    if (!this.timeInSeconds) {
     // this.timeInSeconds = 300;
     this.timeInSeconds=120;
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

}
