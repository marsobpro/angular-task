import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ROUTES } from '../../core/constants/app-routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedInFromLocalStorage = !!localStorage.getItem('authToken');
  private dataSubject = new BehaviorSubject<boolean>(
    this.isLoggedInFromLocalStorage
  );
  public data$: Observable<boolean> = this.dataSubject.asObservable();
  constructor(private router: Router) {
    if (this.isLoggedIn()) {
      this.router.navigate([ROUTES.RESULTS]);
    }
  }

  login(login: string, password: string): void {
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
