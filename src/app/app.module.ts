import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { MyApp } from './app.component';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { HomePage } from '../pages/home/home';
import { ValidatePage } from '../pages/validate/validate';
import { SubmissionsuccessPage } from '../pages/submissionsuccess/submissionsuccess';
import { UploadPage } from '../pages/upload/upload';
import { UploadpicPage } from '../pages/uploadpic/uploadpic';
import { VerifyPage } from '../pages/verify/verify';
import { VerifyerrorPage } from '../pages/verifyerror/verifyerror';
import { VerifysuccessPage } from '../pages/verifysuccess/verifysuccess';
import { ViewconfirmationPage } from '../pages/viewconfirmation/viewconfirmation';
import { FormsModule } from '@angular/forms';
import { GeoServiceProvider } from '../providers/geo-service/geo-service';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ValidatePage,
    SubmissionsuccessPage,
    UploadPage,
    VerifyPage,
    VerifyerrorPage,
    VerifysuccessPage,
    ViewconfirmationPage,
    UploadpicPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ValidatePage,
    SubmissionsuccessPage,
    UploadPage,
    VerifyPage,
    VerifyerrorPage,
    VerifysuccessPage,
    ViewconfirmationPage,
    UploadpicPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Geolocation,
    GeoServiceProvider,
    NativeGeocoder,
    LocationAccuracy,
     {provide: ErrorHandler, useClass: IonicErrorHandler} 
  ]
})
export class AppModule {}
