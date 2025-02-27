import { Injectable, OnInit } from '@angular/core';
import { UserData } from '../models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  login(login: string, password: string): void {
    const token = 'some-auth-token';
    localStorage.setItem('authToken', token);

    this.router.navigate(['/results']);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const isLoggedIn = !!localStorage.getItem('authToken');
    return isLoggedIn;
  }
}
