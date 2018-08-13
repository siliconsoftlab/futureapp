import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Http, HttpModule } from '@angular/http';

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
import { TimerProvider} from '../providers/timer/timer';

import { TestProvider } from '../providers/test/test';
import {ComponentsModule} from '../components/components.module'

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Base64 } from '@ionic-native/base64';
import { HTTP } from '@ionic-native/http';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    //For Translation Module
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
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
    TimerProvider,
    HTTP,
    LocationAccuracy,
  
     {provide: ErrorHandler, useClass: IonicErrorHandler},
    TimerProvider,
    TimerProvider,
    TestProvider,
    Base64
     
  ]
})
export class AppModule {}
