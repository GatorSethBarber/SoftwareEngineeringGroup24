import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private AuthService : AuthService, private router: Router){}

  logout() {
    this.AuthService.userlogOut();
    this.router.navigate(['/login'])
  }
}
