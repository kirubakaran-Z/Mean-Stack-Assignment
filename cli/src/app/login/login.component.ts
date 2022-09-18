import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    public snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}
  postId: any;
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
    const headers = {
      Authorization: 'Bearer my-token',
      'My-Custom-Header': 'foobar',
    };
    const body = this.loginForm.value;
    type Response = {
      statusCode: number;
      Message: string;
      authpass: boolean;
    };
    this.http
      .post<any>('http://localhost/api/login', body, { headers })
      .subscribe((data) => {
        let res = data as Response;
        if (res.authpass) {
          this.router.navigateByUrl('/search');
        } else {
          const config = new MatSnackBarConfig();
          config.panelClass = 'Snackbar';
          config.duration = 300000;
          this.snackBar.open(res.Message, 'x', config);
        }
      });
  }
}
