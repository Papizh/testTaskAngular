import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';


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


  constructor(private toastr: ToastrService,
              private auth: AuthService) {}

  ngOnInit() {
    this.initForm();
    console.log(this.loginForm.controls.state);
  }

  public initForm(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  public submitForm() {
    console.log(this.loginForm.controls);
    this.toastr.success('This is success Form.', 'Success!');
  }

  cancelForm() {
    this.loginForm.reset();
    console.log(this.loginForm.controls);
  }

}
