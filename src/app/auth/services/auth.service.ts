import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ROUTES } from '../../core/constants/app-routes';

const AUTH_TOKEN_KEY = 'authToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedInFromLocalStorage = !!localStorage.getItem(AUTH_TOKEN_KEY);
  private dataSubject = new BehaviorSubject<boolean>(
    this.isLoggedInFromLocalStorage
  );
  public data$: Observable<boolean> = this.dataSubject.asObservable();
  constructor(private router: Router) {}

  login(): void {
    const token = 'some-auth-token';
    localStorage.setItem('authToken', token);
    this.dataSubject.next(true);
    this.router.navigate([ROUTES.RESULTS]);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate([ROUTES.LOGIN]);
    this.dataSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
