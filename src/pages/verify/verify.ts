import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { VerifysuccessPage } from '../verifysuccess/verifysuccess';
import { VerifyerrorPage } from '../verifyerror/verifyerror';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { ValidatePage } from '../validate/validate';

@IonicPage()
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {
  lat1: any;
  lng1: any;
  lat2: any;
  lng2: any;
  loading: any;
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
  loader = this.loadingCtrl.create({
    content: "Please wait...",
  });
  constructor(private nativeGeocoder: NativeGeocoder, public geo: Geolocation, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toaster: ToastController, public locationAccuracy: LocationAccuracy) {
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
    
    /*console.log(' this.street ' + this.street);
    console.log(' this.unitno ' + this.unitno);
    console.log(' this.postalcode ' + this.postalcode);*/
   this.geoLocate();

    //this.test();
  }

  ionViewDidLoad() {
  }

  geoLocate() {
    // alert("1");console.log("1");
    //this.loader.present();
    let options = {
      enableHighAccuracy: true
    };
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // alert("2");console.log('2');
        this.geo.getCurrentPosition(options).then((position: Geoposition) => {
          // alert("3"); console.log("3");
          this.lat1 = position.coords.latitude;
          this.lng1 = position.coords.longitude;
          console.log('The gps coordinates are latitude=' + position.coords.latitude + ' and longitude=' + position.coords.longitude);
          this.getAddrress(position);
        }).catch((err: Error) => {
          console.log('Error while getting permissions' + err.message);
          alert("Error while getting permissions " + err.message);
          return;
        });
      },
      (error: Error) => {
        console.log('Error requesting location permissions', JSON.stringify(error));
        alert("Please enable GPS  ");
        return;
      }
    );

  }
  getAddrress(position) {
    // alert("4"); console.log("4");

    this.nativeGeocoder.reverseGeocode(position.coords.latitude, position.coords.longitude).then(
      (res: NativeGeocoderReverseResult[]) => {
        //  alert("5"); console.log("5");
        //console.log(' res.entries() ' + res.entries());
        console.log(' reverseGeocode.length ' + res.length);
        console.log(JSON.stringify(res));
        //  alert("You are located approximately nearby this  address " + JSON.stringify(res))
        for (let re of res) {
          console.log(re.thoroughfare);
          console.log(re.postalCode);
        }
        return res;
      }
    ).catch(err => {
      console.log('Error requesting location permissions', JSON.stringify(err));
      alert("Please try again, could not get the your location");
      return;
    });



    //alert("reverse ");
    // let add = this.unitno + ' ' + this.street + ' ' + this.postalcode;
    //add='47A Lorong 4 Geylang 399291';
    let add = this.postalcode;

    this.nativeGeocoder.forwardGeocode('postalCode ' + this.postalcode + ' ' + ' locality Singapore')
      .then((coordinates: NativeGeocoderForwardResult[]) => {
        // alert('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude);
        console.log(' forwardGeocode.length ' + coordinates.length);
        console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude);
        this.lat2 = coordinates[0].latitude;
        this.lng2 = coordinates[0].longitude;
        this.calculateDistance(this.lat1, this.lat2, this.lng1, this.lng2);
        this.getDistance(this.lat1, this.lat2, this.lng1, this.lng2);
      }
      )
      .catch((error: Error) => {
        console.log('Error retriving the geo location of given address ', JSON.stringify(error));
        alert("Please Enter Correct Address.  " + JSON.stringify(error));
       // this.loader.dismiss();
        this.navCtrl.pop();
        //this.navCtrl.pop
        // this.navCtrl.setRoot(ValidatePage, { "nric": this.nric, "fullname": this.fullname });
      });

  }

  calculateDistance(lat1: number, lat2: number, long1: number, long2: number) {

    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    // alert("calculateDistance " + dis);
    console.log("calculateDistance " + dis);
    return dis;
  }
  getDistance(lat1: number, lat2: number, long1: number, long2: number) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.rad(lat2 - lat1);
    var dLong = this.rad(long2 - long1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(lat1)) * Math.cos(this.rad(lat2)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    console.log("getDistance " + d);

    if (d <= 200) {
     // this.loader.dismiss();
      //this.navCtrl.setRoot(VerifysuccessPage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms });
     
      this.navCtrl.push(VerifysuccessPage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms,"dob":this.dob,"rent":this.rent  });
    } else {
      //this.loader.dismiss();
      this.navCtrl.push(VerifyerrorPage, { "nric": this.nric, "fullname": this.fullname, "contactno": this.contactno, "street": this.street, "unitno": this.unitno, "postalcode": this.postalcode, "noofoccupants": this.noofoccupants, "noofrooms": this.noofrooms,"dob":this.dob,"rent":this.rent });
    }
    return d; // returns the distance in meter
  };

  rad(x) {
    return x * Math.PI / 180;
  };

  test() {

alert('inside test');
    this.nativeGeocoder.forwardGeocode('postalCode ' + this.postalcode + ' ' + ' locality Singapore')
    .then((coordinates: NativeGeocoderForwardResult[]) => {
      // alert('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude);
      console.log('step 1 forwardGeocode.length ' + coordinates.length);
      console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude);
      this.lat2 = coordinates[0].latitude;
      this.lng2 = coordinates[0].longitude;
     // this.calculateDistance(this.lat1, this.lat2, this.lng1, this.lng2);
     // this.getDistance(this.lat1, this.lat2, this.lng1, this.lng2);
     this.test2(this.lat2 , this.lng2)
    }
    )
    .catch((error: Error) => {
      console.log('Error retriving the geo location of given address ', JSON.stringify(error));
      alert("Please Enter Correct Address.  " + JSON.stringify(error));
      this.loader.dismiss();
      this.navCtrl.pop();
      //this.navCtrl.pop
      // this.navCtrl.setRoot(ValidatePage, { "nric": this.nric, "fullname": this.fullname });
    });

   
  }
  test2(lat2,lng2){
    alert('inside test2');
    console.log('The coordinates are this.lat2=' + this.lat2 + ' and this.lng2=' +this.lng2);

    this.nativeGeocoder.reverseGeocode( lat2, lng2 ).then(
      (res: NativeGeocoderReverseResult[]) => {
        //  alert("5"); console.log("5");
        //console.log(' res.entries() ' + res.entries());
        console.log('strep 2 reverseGeocode.length ' + res.length);
        console.log(JSON.stringify(res));
        alert("You are located approximately nearby this  address " + JSON.stringify(res))
        for (let re of res) {
          console.log(re.thoroughfare);
          console.log(re.postalCode);
        }
        return res;
      }
    ).catch((error: Error) =>{
      console.log('Error requesting location permissions',error.message);
      alert("Please try again, could not get the your location "+error.message);
      return;
    });
  }
}
