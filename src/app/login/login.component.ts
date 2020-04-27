import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { pipe } from 'rxjs';
import { first } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control && control.parent.get('password.value') !== control.parent.get('passwordConfirm.value') && control.dirty);
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public emailPattern = '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';
  loading = false;
  submitted = false;
  error = '';
  returnUrl = 'profile';
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.initForm();
  }
  get f() { return this.loginForm.controls; }

  public initForm(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailPattern)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),

      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ])
    },
      {
        validators: this.checkPasswords
      });
  }
  public checkPasswords(loginForm: FormGroup) {
    const pass = loginForm.controls.password.value;
    const confirmPass = loginForm.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
  }


  public submitForm(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.f.userName.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.toastr.success('User login success');
        },
        error => {
          this.error = error;
          this.toastr.error(' Username or password is incorrect ')
        });
  }

  cancelForm() {
    this.loginForm.reset();

  }

}
