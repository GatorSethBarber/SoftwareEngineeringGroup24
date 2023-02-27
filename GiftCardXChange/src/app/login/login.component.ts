import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private AuthService: AuthService
  ) {}

  loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    passWord: ['', Validators.required],
  });

  onSubmit() {
    this.AuthService.login(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
        alert('Yay!!! Welcome');
        this.loginForm.reset();
        this.router.navigate(['brand']);
      },
      (err) => alert('hmmhmm something wrong')
    );
  }
}
