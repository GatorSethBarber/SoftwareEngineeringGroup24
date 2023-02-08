import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder,private http: HttpClient, private router: Router){}

  signUpForm = this.formBuilder.group({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    passWord: new FormControl("")
}
  );

  signUpSubmmitted(){
    console.log(this.signUpForm);
  }

}
