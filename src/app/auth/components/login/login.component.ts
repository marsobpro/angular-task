import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login = '';
  password = '';
  authService = inject(AuthService);

  onSubmit(): void {
    this.authService.login(this.login, this.password);
  }
}
