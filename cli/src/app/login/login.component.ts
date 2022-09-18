import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}

  //expression to allow only alphanumeric
  validPattern = '^[a-zA-Z0-9]+$';

  //form element to valid rules and get data
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern(this.validPattern),
    ]),
  });
  //function validates the input and navigates to search
  onlogin() {
    if (!this.loginForm.valid) {
      return;
    }
    this.router.navigateByUrl('/search');
  }
}
