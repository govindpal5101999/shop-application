import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SignupComponent {
  username!: string;
  password!: string;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  register() {
    this.auth.register(this.username, this.password).subscribe({
      next: (res: any) => {
        this.errorMessage = '';
        this.successMessage = res.message;;
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.successMessage = '';

        this.errorMessage = err.error;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }
}