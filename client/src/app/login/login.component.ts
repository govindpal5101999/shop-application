import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res: any) => {
        if (res.role) {
          const token = 'Basic ' + btoa(this.username + ':' + this.password);
          this.auth.setSession(this.username, res.role, token); // Store role in localStorage
          this.router.navigate(['/']);
        } else {
          console.error('Role is undefined');
        }
      },
      error: (err) => {
        alert('Login failed: ' + err.error);
      }
    });
  }
}