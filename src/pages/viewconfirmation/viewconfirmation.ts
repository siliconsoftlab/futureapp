import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubmissionsuccessPage } from '../submissionsuccess/submissionsuccess';
import { ValidatePage } from '../validate/validate';
/**
 * Generated class for the ViewconfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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


  //This is for timer
  timeInSeconds: any;
  time: any;
  runTimer: any;
  hasStarted: any;
  hasFinished: any;
  remainingTime: number;
  displayTime: any;

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

  public isThirdBedRoom: boolean;
  public isfourthBedRoom: boolean;
  public isrowVisbile: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fullname = this.navParams.get('fullname');
    this.nric = this.navParams.get('nric');
    this.contactno = this.navParams.get('contactno');
    this.street = this.navParams.get('street');
    this.unitno = this.navParams.get('unitno');
    this.postalcode = this.navParams.get('postalcode');
    this.noofoccupants = this.navParams.get('noofoccupants');
    this.noofrooms = this.navParams.get('noofrooms');
    this.remainingtimeres = this.navParams.get('remainingtime');


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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewconfirmationPage');
  }
  next() {
       if (this.remainingTime > 0) {
      this.navCtrl.push(SubmissionsuccessPage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms, "remainingtime": this.remainingTime, "maindoorpic": this.maindoorpic, "livingroompic": this.livingroompic, "kitchenpic": this.kitchenpic, "bedroom1pic": this.bedroom1pic, "bedroom2pic": this.bedroom2pic, "bedroombpic": this.bedroombpic });
    } else {
      alert('Timed Out. You will have to verify your location and take pics again');
      this.navCtrl.setRoot(ValidatePage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms });

    }
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
}
