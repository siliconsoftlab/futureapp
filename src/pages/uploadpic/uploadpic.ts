import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewconfirmationPage } from '../viewconfirmation/viewconfirmation';
import { ValidatePage } from '../validate/validate';
import { TimerProvider } from '../../providers/timer/timer';
import { TranslateService } from '@ngx-translate/core';
import { FinalInput } from '../FinalInput';
import { HomePage } from '../home/home';

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
  dob:Date;
  rent:number;
timerTd:any;
  public maindoor: string = 'MAIN DOOR';
  public livingroom: string = 'LIVING ROOM A';
  public livingroom1: string = 'LIVING ROOM B';
  public kitchen: string = 'KITCHEN';
  public cmntoilet: string = 'COMMON TOILET';
  public bedroom1: string = 'MY BEDROOM A';
  public bedroom2: string = 'MY BEDROOM B';
  public bedroomb: string = 'BEDROOM 2';
  public bedroomc: string = 'BEDROOM 3';
  public bedroomd: string = 'BEDROOM 4';

  mypic: string;


 /* maindoorpic: string="assets/imgs/homechecklogo.png";
  livingroompic: string="assets/imgs/homechecklogo.png";
  livingroom1pic: string="assets/imgs/homechecklogo.png";
  cmntoiletpic: string="assets/imgs/homechecklogo.png";
  kitchenpic: string="assets/imgs/homechecklogo.png";
  bedroom1pic: string="assets/imgs/homechecklogo.png";
  bedroom2pic: string="assets/imgs/homechecklogo.png";
  bedroombpic: string="assets/imgs/homechecklogo.png";
  bedroomcpic: string="assets/imgs/homechecklogo.png";
  bedroomdpic: string="assets/imgs/homechecklogo.png";*/


  maindoorpic: string;
  livingroompic: string;
  livingroom1pic: string;
  cmntoiletpic:string;
  kitchenpic: string;
  bedroom1pic: string;
  bedroom2pic:string;
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
  pausetime: any;
  restime: any;
  difftime:any;
  tilemsg: string;
  contentmsg: string;
  pictype: string;
  alert: any;
  screenoff: boolean;

  public isThirdBedRoom: boolean;
  public isfourthBedRoom: boolean;
  public isrowVisbile: boolean;

  public YOURTIMEISUP: any;
  public ENTERDETAILS1: any;
  public ENTERDETAILS2: any;
  public ENTERDETAILS3: any;
  public REENTERDETAILS: any;
  public REENTERDET:any;
  public PHOTOTAKING1:any;
  public PHOTOTAKING2:any;
  public base64Image: string[];


  public MAINDOOR:any;
  public LIVINGROOM1:any;
	public LIVINGROOM2:any;
	public  COMMONTOILET:any;
	public KITCHEN:any;
  public	MYBEDROOM1:any;
  public 	MYBEDROOM2:any;
  public 	BEDROOMB:any;
	public BEDROOMC:any;
	public BEDROOMD:any;



  public ALERTTITLE: any;
  public id:any;
  //public ImageList: Array<FinalInput>;
  public ImageList: Array<FinalInput> = new Array<FinalInput>();
 //public ImageList: { ImageString: string, ImageTitle: string }[] = [];
 public alerttileMsg;any;
 public PLZTAKE:any;
 public PIC:any;
 public invalidinput:any;
 OK:any;
 INSTRUCTIONSWORD:any;
 INSTRUCTIONSMSG:any;
 TITLEMSG:any;
 INSTRUCTIONSMSGTYPE:any;
  constructor(private platform: Platform, private translate: TranslateService, public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private sanitizer: DomSanitizer, private alertCtrl: AlertController, private timer: TimerProvider) {
    //let foo:string = this.translate.get('YOURTIMEISUP');
   
    
   
    this.MAINDOOR = this.translate.get('MAINDOOR');
    this.LIVINGROOM1 = this.translate.get('LIVINGROOM1');
    this.LIVINGROOM2 = this.translate.get('LIVINGROOM2');
    this.COMMONTOILET = this.translate.get('COMMONTOILET');
    this.KITCHEN = this.translate.get('KITCHEN');
    this.MYBEDROOM1 = this.translate.get('MYBEDROOM1');
    this.MYBEDROOM2 = this.translate.get('MYBEDROOM2');
    this.BEDROOMB=this.translate.get('BEDROOMB');
    this.BEDROOMC=this.translate.get('BEDROOMC');
    this.BEDROOMD=this.translate.get('BEDROOMD');



    this.YOURTIMEISUP = this.translate.get('YOURTIMEISUP');
    this.ENTERDETAILS1 = this.translate.get('ENTERDETAILS1');
    this.ENTERDETAILS2 = this.translate.get('ENTERDETAILS2');
    this.ENTERDETAILS3 = this.translate.get('ENTERDETAILS3');
    this.REENTERDETAILS = this.translate.get('REENTERDETAILS');
    this.PHOTOTAKING1 = this.translate.get('INTSRUCTIONFORPHOTOTAKING1');
    this.PHOTOTAKING2 = this.translate.get('INTSRUCTIONFORPHOTOTAKING2');
    this.REENTERDET=this.translate.get('REDETAIL');


       


    

    this.translate.get('YOURTIMEISUP').subscribe(res => { this.YOURTIMEISUP = res; });
    this.translate.get('ENTERDETAILS1').subscribe(res => { this.ENTERDETAILS1 = res; });
    this.translate.get('ENTERDETAILS2').subscribe(res => { this.ENTERDETAILS2 = res; });
    this.translate.get('ENTERDETAILS3').subscribe(res => { this.ENTERDETAILS3 = res; });
    this.translate.get('REENTERDETAILS').subscribe(res => { this.REENTERDETAILS = res; });


    this.translate.get('MAINDOOR').subscribe(res => { this.MAINDOOR = res; });
    this.translate.get('LIVINGROOM1').subscribe(res => { this.LIVINGROOM1 = res; });
    this.translate.get('LIVINGROOM2').subscribe(res => { this.LIVINGROOM2 = res; });
    this.translate.get('COMMONTOILET').subscribe(res => { this.COMMONTOILET = res; });
    this.translate.get('KITCHEN').subscribe(res => { this.KITCHEN = res; });
    this.translate.get('MYBEDROOM1').subscribe(res => { this.MYBEDROOM1 = res; });
    this.translate.get('MYBEDROOM2').subscribe(res => { this.MYBEDROOM2 = res; });
    this.translate.get('BEDROOMB').subscribe(res => { this.BEDROOMB = res; });
    this.translate.get('BEDROOMC').subscribe(res => { this.BEDROOMC = res; });
    this.translate.get('BEDROOMD').subscribe(res => { this.BEDROOMD = res; });
   



    this.translate.get('REDETAIL').subscribe(res => { this.REENTERDET = res; });
    this.translate.get('INTSRUCTIONFORPHOTOTAKING1').subscribe(res => { this.PHOTOTAKING1 = res; });
    this.translate.get('INTSRUCTIONFORPHOTOTAKING2').subscribe(res => { this.PHOTOTAKING2 = res; });
    this.ALERTTITLE = this.translate.get('YOURTIMEISUP');
    this.translate.get('ALERTTITLE').subscribe(res => { this.ALERTTITLE = res; });

    this.PLZTAKE = this.translate.get('PLEASETAKE');
    this.translate.get('PLEASETAKE').subscribe(res => { this.PLZTAKE = res; });


    this.PIC = this.translate.get('PIC');
   this.translate.get('PIC').subscribe(res => { this.PIC = res; });
   
   this.invalidinput = this.translate.get('INVALIDINPUT');
	 this.translate.get('INVALIDINPUT').subscribe(res => { this.invalidinput = res; });

   this.OK = this.translate.get('OK');
   this.translate.get('OK').subscribe(res => { this.OK = res; });


    console.log("===================> this.ALERTTITLE"+this.ALERTTITLE);
    this.base64Image = new Array();
    //this.ImageList=new Array(FinalInput);

 


   /* this.base64Image.push(this.maindoorpic);
    this.base64Image.push(this.livingroompic);
    this.base64Image.push(this.livingroom1pic);
    this.base64Image.push(this.cmntoiletpic);
    this.base64Image.push(this.kitchenpic);
    this.base64Image.push(this.bedroom1pic);
    this.base64Image.push(this.bedroom2pic);
    this.base64Image.push(this.bedroombpic);
    this.base64Image.push(this.bedroomcpic);
    this.base64Image.push(this.bedroomdpic);*/


    this.fullname = this.navParams.get('fullname');
    this.nric = this.navParams.get('nric');
    this.contactno = this.navParams.get('contactno');
    this.street = this.navParams.get('street');
    this.unitno = this.navParams.get('unitno');
    this.postalcode = this.navParams.get('postalcode');
    this.noofoccupants = this.navParams.get('noofoccupants');
    this.noofrooms = this.navParams.get('noofrooms');
    this.dob = this.navParams.get('dob');
    this.rent = this.navParams.get('rent');
    
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



  ionViewDidLoad() {
    this.platform.ready().then(() => {

    /*  var temp = this;
      var i = 0;
      setTimeout(function(){ 
        temp.navCtrl.setRoot(ValidatePage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms });
          
      }, 1000);*/



    /*  setTimeout(() => {
        this.navCtrl.setRoot(ValidatePage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms });
      }, 10000);*/


      let backAction = this. platform.registerBackButtonAction(() => {
     
      clearTimeout(this. id);
        this.navCtrl.pop();
        backAction();
      },2)

      this.platform.resume.subscribe((e) => {

        this.restime = new Date();

        if (this.screenoff) {
          let timeDiff = this.restime - this.pausetime;
          this.difftime=timeDiff/1000;
          this.remainingTime=this.remainingTime-this.difftime;
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


  ngOnInit(){
    console.log("mgoinit");
  
  
}


  takePicture(pic) {

    if (this.remainingTime == 0) {
     /* let alert = this.alertCtrl.create({
        title: '<div> Your time is up.</div>',
        subTitle: '<div>Sorry, you have to complete the photo </div><div>taking and submission with 5 mins.</div><div>Please start again from Step1.</div>',
        buttons: ['Re-enter Details'],
        enableBackdropDismiss: false
      });
      alert.present();*/
      this.navCtrl.setRoot(ValidatePage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms,"dob":this.dob,"rent":this.rent  });
      return;
    }
    switch (pic) {
      case this.maindoor:
        this.tilemsg = 'Main Door';
        this.contentmsg = 'Main door Instructions';
        this.alerttileMsg=this.MAINDOOR;
        this.INSTRUCTIONSMSGTYPE='MAINDOORINSTRUCTIONS';
        break;
      case this.livingroom:
        this.tilemsg = 'Livingroom Pic A';
        this.contentmsg = 'Livingroom Instructions'
        this.alerttileMsg=this.LIVINGROOM1;
        this.INSTRUCTIONSMSGTYPE='LIVINGROOM1INSTRUCTIONS';
        break;
      case this.livingroom1:
        this.tilemsg = 'Livingroom Pic 2';
        this.contentmsg = 'Livingroom Instructions'
        this.alerttileMsg=this.LIVINGROOM2;
        this.INSTRUCTIONSMSGTYPE='LIVINGROOM2INSTRUCTIONS';
        break;
      case this.cmntoilet:
        this.tilemsg = 'Common Toilet ';
        this.contentmsg = 'Common Toilet Instructions'
        this.alerttileMsg=this.COMMONTOILET;
        this.INSTRUCTIONSMSGTYPE='COMMONTOILETINSTRUCTIONS';
        break;
      case this.kitchen:
        this.tilemsg = 'kitchen';
        this.contentmsg = 'Kitchen Instructions'
        this.alerttileMsg=this.KITCHEN;
        this.INSTRUCTIONSMSGTYPE='KITCHENINSTRUCTIONS';
        break;
      case this.bedroom1:
        this.tilemsg = 'My Bedroom Pic 1';
        this.contentmsg = 'My Bedroom Pic 1 Instructions'
        this.alerttileMsg=this.MYBEDROOM1;
        this.INSTRUCTIONSMSGTYPE='MYBEDROOM1INSTRUCTIONS';
        break;
      case this.bedroom2:
        this.tilemsg = 'My Bedroom Pic 2';
        this.contentmsg = 'My Bedroom Pic 2 Instructions'
        this.alerttileMsg=this.MYBEDROOM2;
        this.INSTRUCTIONSMSGTYPE='MYBEDROOM2INSTRUCTIONS';
        break;
      case this.bedroomb:
        this.tilemsg = 'Bedroom B';
        this.contentmsg = 'Bedroom B Instructions'
        this.alerttileMsg=this.BEDROOMB;
        this.INSTRUCTIONSMSGTYPE='BEDROOMBINSTRUCTIONS';
        break;
      case this.bedroomc:
        this.tilemsg = 'Bedroom C';
        this.contentmsg = 'Bedroom C Instructions'
        this.alerttileMsg=this.BEDROOMC;
        this.INSTRUCTIONSMSGTYPE='BEDROOMCINSTRUCTIONS';
        break;
      case this.bedroomd:
        this.tilemsg = 'Bedroom D';
        this.contentmsg = 'Bedroom D Instructions'
        this.alerttileMsg=this.BEDROOMD;
        this.INSTRUCTIONSMSGTYPE='BEDROOMDINSTRUCTIONS';
        break;

    }
    this.INSTRUCTIONSMSG=this.translate.get( this.INSTRUCTIONSMSGTYPE);
    this.translate.get( this.INSTRUCTIONSMSGTYPE).subscribe(res => { this.INSTRUCTIONSMSG = res; });
   
    this.TITLEMSG=this.translate.get( this.alerttileMsg);
    this.translate.get( this.alerttileMsg).subscribe(res => { this.TITLEMSG = res; });
  

    this.INSTRUCTIONSWORD=this.translate.get('INSTRUCTIONS');
    this.translate.get('INSTRUCTIONS').subscribe(res => { this.INSTRUCTIONSWORD = res; });

    this.OK = this.translate.get('OK');
    this.translate.get('OK').subscribe(res => { this.OK = res; });

    
    this.alert = this.alertCtrl.create({
      title: `<div style="color: red;">${this.TITLEMSG}</div><div id="three">${this.INSTRUCTIONSWORD}</div>`,
      subTitle: `<div no-margin text-center>${this.INSTRUCTIONSMSG}</div>`,
      buttons: [
        {
          text: `${this.OK}`,
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
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageUri) => {
      //  alert("Success");
      let input= new FinalInput(pic,imageUri);
      this.ImageList.push(input);
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


  async next() {
   
    if (this.remainingTime > 0) {

    if (this.isnull(this.maindoorpic)) {
      let alert = this.alertCtrl.create({
        title: `<div>${this.invalidinput}</div>`,
        subTitle: `<div>${this.PLZTAKE}${this.MAINDOOR}${this.PIC}</div>`,
        buttons: [`${this.OK}`],
        enableBackdropDismiss: false
      });
      alert.present();
       return;
      } else if (this.isnull(this.livingroompic)) {
        let alert = this.alertCtrl.create({
          title: `<div>${this.invalidinput}</div>`,
          subTitle: `<div>${this.PLZTAKE}${this.LIVINGROOM1}${this.PIC}</div>`,
          buttons: [`${this.OK}`],
          enableBackdropDismiss: false
        });
        alert.present();
        return;
      } else if (this.isnull(this.livingroom1pic)) {
        let alert = this.alertCtrl.create({
          title: `<div>${this.invalidinput}</div>`,
          subTitle: `<div>${this.PLZTAKE}${this.LIVINGROOM2}${this.PIC}</div>`,
          buttons: [`${this.OK}`],
          enableBackdropDismiss: false
        });
        alert.present();
        return;
      } else if (this.isnull(this.cmntoiletpic)) {
        let alert = this.alertCtrl.create({
          title: `<div>${this.invalidinput}</div>`,
          subTitle: `<div>${this.PLZTAKE}${this.COMMONTOILET}${this.PIC}</div>`,
          buttons: [`${this.OK}`],
          enableBackdropDismiss: false
        });
        alert.present();
        return;
      } else if (this.isnull(this.kitchenpic)) {
        let alert = this.alertCtrl.create({
          title: `<div>${this.invalidinput}</div>`,
          subTitle: `<div>${this.PLZTAKE}${this.KITCHEN}${this.PIC}</div>`,
          buttons: [`${this.OK}`],
          enableBackdropDismiss: false
        });
        alert.present();
        return;
      } else if (this.isnull(this.bedroom1pic)) {
        let alert = this.alertCtrl.create({
          title: `<div>${this.invalidinput}</div>`,
          subTitle: `<div>${this.PLZTAKE}${this.MYBEDROOM1}${this.PIC}</div>`,
          buttons: [`${this.OK}`],
          enableBackdropDismiss: false
        });
        alert.present();
        return;
      } else if (this.isnull(this.bedroom2pic)) {
        let alert = this.alertCtrl.create({
          title: `<div>${this.invalidinput}</div>`,
          subTitle: `<div>${this.PLZTAKE}${this.MYBEDROOM2}${this.PIC}</div>`,
          buttons: [`${this.OK}`],
          enableBackdropDismiss: false
        });
        alert.present();
        return;
      } else if (this.isnull(this.bedroombpic)) {
        let alert = this.alertCtrl.create({
          title: `<div>${this.invalidinput}</div>`,
          subTitle: `<div>${this.PLZTAKE}${this.BEDROOMB}${this.PIC}</div>`,
          buttons: [`${this.OK}`],
          enableBackdropDismiss: false
        });
        alert.present();
        return;
      }

      if (this.isThirdBedRoom && this.isnull(this.bedroomcpic)) {
        let alert = this.alertCtrl.create({
          title: `<div>${this.invalidinput}</div>`,
          subTitle: `<div>${this.PLZTAKE}${this.BEDROOMC}${this.PIC}</div>`,
          buttons: [`${this.OK}`],
          enableBackdropDismiss: false
        });
        alert.present();
        return;
      }
      if (this.isfourthBedRoom && this.isnull(this.bedroomdpic)) {
        let alert = this.alertCtrl.create({
          title: `<div>${this.invalidinput}</div>`,
          subTitle: `<div>${this.PLZTAKE}${this.BEDROOMD}${this.PIC}</div>`,
          buttons: [`${this.OK}`],
          enableBackdropDismiss: false
        });
        alert.present();
        return;
      }
      for (let img of this.ImageList ) {
        console.log("*************");
        await console.log(img.ImageTitle);
       await  console.log(img.ImageString);
      }

      this.navCtrl.push(ViewconfirmationPage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms, "remainingtime": this.remainingTime, "maindoorpic": this.maindoorpic, "livingroompic": this.livingroompic, "kitchenpic": this.kitchenpic, "bedroom1pic": this.bedroom1pic, "bedroom2pic": this.bedroom2pic, "bedroombpic": this.bedroombpic, "livingroom1pic": this.livingroom1pic, "cmntoilet": this.cmntoiletpic, "bedroomcpic": this.bedroomcpic, "bedroomdpic": this.bedroomdpic,"images":this.ImageList ,"timer":this. id,"dob":this.dob,"rent":this.rent });
    } /*else {

      let alert = this.alertCtrl.create({
        title: '<div> Your time is up.</div>',
        subTitle: '<div>Sorry, you have to complete the photo </div><div>taking and submission with 5 mins.</div><div>Please start again from Step1.</div>',
        buttons: ['Re-enter Details'],
        enableBackdropDismiss: false
      });
      alert.present();

      this.navCtrl.setRoot(ValidatePage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms });

    }*/

  }
  prev() {
    clearTimeout(this. id);
    this.navCtrl.setRoot(ValidatePage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms,"dob":this.dob,"rent":this.rent  });
  }


  initTimer() {

    // Pomodoro is usually for 25 minutes
    if (!this.timeInSeconds) {
      // this.timeInSeconds = 300;
      this.timeInSeconds = 300;
      // this.startCount(this.timeInSeconds);

     // title: `<div> ${temp.YOURTIMEISUP}</div>`,
      var temp = this;
      var i = 0;
      this. id = setTimeout(function(){ 
  
       let alert = temp.alertCtrl.create({
          title: `<div> ${temp.YOURTIMEISUP}</div>`,
          subTitle: `<div>${temp.ENTERDETAILS1}</div><div>${temp.ENTERDETAILS2}</div>`,
          buttons: [`${temp.REENTERDET}`],
          enableBackdropDismiss: false
        });
        alert.present();
      
  
       temp.navCtrl.setRoot(ValidatePage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms,"dob":this.dob,"rent":this.rent  });
        return;
      }, 300000);
    
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
  startCount(timeInSeconds) {


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
  ionViewDidLeave() {
    console.log("=======================================> Time out cleared upload pic");
    
    }
    logout(){
      clearTimeout(this. id);
      this.navCtrl.setRoot(HomePage);
    }
}
