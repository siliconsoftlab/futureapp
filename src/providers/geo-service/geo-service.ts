
import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
/*
  Generated class for the GeoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeoServiceProvider {

  constructor(public geo: Geolocation, private nativeGeocoder: NativeGeocoder,private locationAccuracy: LocationAccuracy) {
    console.log('Hello GeoServiceProvider Provider');
  }
  geoLocate() {
  
    

   
  }
 

}
