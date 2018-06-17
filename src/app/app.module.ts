import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ValidatePage } from '../pages/validate/validate';
import { SubmissionsuccessPage } from '../pages/submissionsuccess/submissionsuccess';
import { UploadPage } from '../pages/upload/upload';
import { VerifyPage } from '../pages/verify/verify';
import { VerifyerrorPage } from '../pages/verifyerror/verifyerror';
import { VerifysuccessPage } from '../pages/verifysuccess/verifysuccess';
import { ViewconfirmationPage } from '../pages/viewconfirmation/viewconfirmation';



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
    ViewconfirmationPage
  ],
  imports: [
    BrowserModule,
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
    ViewconfirmationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
