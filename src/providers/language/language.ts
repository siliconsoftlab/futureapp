import { Injectable } from "@angular/core";


@Injectable()
export class LanguageService {
  languages : Array<LanguageModel> = new Array<LanguageModel>();

   constructor() {
     this.languages.push(
       {name: "English", code: "en"},
       {name: "Spanish", code: "es"},
       {name: "Arabic", code: "ar"}
     );
   }

   getLanguages(){
     return this.languages;
   }
 }
 export class LanguageModel{
  name: string;
  code: string;
}
