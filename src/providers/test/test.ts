import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TestProvider {
  data: any = null;
  constructor(public http: HttpClient) {
    console.log('Hello TestProvider Provider');
  }
  load() {
    console.log('inside load');
    if (this.http) {
      console.log('inside this.http');
      return Promise.resolve(10);
    }
    console.log('outside this.http');
    return new Promise(resolve => { 
      console.log('inside resolve(10)');
      
      resolve(10); })
  }

  getData() {
    return this.load().then(data => { return data; })
  }
}
