import { Component, inject } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.login, this.password);
  }
}
