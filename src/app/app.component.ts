import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { ValidatePage } from '../pages/validate/validate';
import { SubmissionsuccessPage } from '../pages/submissionsuccess/submissionsuccess';

import { VerifyPage } from '../pages/verify/verify';
import { VerifyerrorPage } from '../pages/verifyerror/verifyerror';
import { VerifysuccessPage } from '../pages/verifysuccess/verifysuccess';
import { ViewconfirmationPage } from '../pages/viewconfirmation/viewconfirmation';
import { UploadpicPage } from '../pages/uploadpic/uploadpic';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


//import { ValidatePage } from '../pages/validate/validate';
@Component({
  templateUrl: 'app.html'
  
})

export class MyApp {
  rootPage:any = HomePage; 
    constructor(private translate: TranslateService,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      translate.setDefaultLang('en');
      translate.use('en');
      //translate.setDefaultLang('zh-ch');
      //translate.use('zh-cn');         
    });
  }
}

