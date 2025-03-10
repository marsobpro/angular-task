import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isSettingsPanelOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSettingsClick(isOpen: boolean) {
    this.isSettingsPanelOpen = isOpen;
  }
}
