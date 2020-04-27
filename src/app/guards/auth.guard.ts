import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue();
    if (currentUser) {
      // this.toastr.success('login')
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      this.toastr.error('You dont have access, please login')
      return false;
    }

  }
}
