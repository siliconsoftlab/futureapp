import { Component } from '@angular/core';

/**
 * Generated class for the TitlebarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'titlebar',
  templateUrl: 'titlebar.html'
})
export class TitlebarComponent {

  text: string;

  constructor() {
    console.log('Hello TitlebarComponent Component');
    this.text = 'Hello World';
  }

}
