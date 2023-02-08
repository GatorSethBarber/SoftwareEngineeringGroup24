import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder,private http: HttpClient, private router: Router){}
  
  loginForm = this.formBuilder.group({
    userName: new FormControl(""),
    passWord: new FormControl(""),
  });


  onSubmit(): void {
   console.log(this.loginForm);
   }
  
  }





