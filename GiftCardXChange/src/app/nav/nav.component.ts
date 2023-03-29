import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  currentUser: User | null;
  users: User[] = [];

  constructor(public AuthService: AuthService, private router: Router) {
    try {
      AuthService.user$.subscribe((v) => (this.currentUser = v));
    } catch {}
  }

  logout() {
    this.AuthService.userlogOut().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
