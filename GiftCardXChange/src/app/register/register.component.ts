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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private AuthService: AuthService
  ) {}

  signUpForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern(/^[A-z0-9]*$/)]],
    firstName: ['', [Validators.required, Validators.pattern(/^[A-z0-9]*$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[A-z0-9]*$/)]],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
      ],
    ],
    passWord: ['', [Validators.required, Validators.minLength(6)]],
  });
  get f() {
    return this.signUpForm.controls;
  }
  signUpSubmitted() {
    this.AuthService.register(this.signUpForm.value).subscribe(
      (res: any) => {
        alert('Yay!!! Welcome');
        this.signUpForm.reset();
        this.router.navigate(['brand']);
      },
      (err) => alert('hmmhmm something wrong')
    );
  }
}


