import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }
  saveuser(myForm :any){
    return this.http.post("http://localhost:3000/myForm",myForm.value);

  }

}
