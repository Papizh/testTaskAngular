import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(private router: Router,
  private authService: AuthService ) {
   
 }
  canActivate(): Observable<boolean>| boolean{
    const token: string = localStorage.getItem('token');
    if(token) {
      return true;
    }else {
      this.router.navigate(['/login']);
      return false
    }
  };
  
  
}
