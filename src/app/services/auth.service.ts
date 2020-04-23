import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public login(userData: User){
    localStorage.setItem('ACCESS_TOKEN', "access_token");
  }
  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public logOut() {
    localStorage.removeItem('ACCESS_TOKEN');
  }

}
