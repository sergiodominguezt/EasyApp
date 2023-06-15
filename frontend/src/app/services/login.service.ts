import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { 
    
  }

  loginUser(registerData: any){
    //You have to use a method post, according your API rest
    return this.http.post<any>('http://localhost:3000/api/login', registerData); 
  }
}
