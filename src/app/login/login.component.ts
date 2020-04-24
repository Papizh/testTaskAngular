import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorStateMatcher } from '@angular/material/core';

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
  returnUrl: string;
  matcher = new MyErrorStateMatcher();

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.initForm();
    console.log(this.loginForm.controls);
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
        Validators.minLength(6),
        
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
    console.log(this.loginForm.value);
  }

  cancelForm() {
    this.loginForm.reset();
    console.log(this.loginForm.controls);
  }

}
