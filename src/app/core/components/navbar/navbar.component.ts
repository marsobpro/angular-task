import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() searchQuery = new EventEmitter();
  @Output() isSettingsPanelOpen = new EventEmitter();

  isSortingOpen = false;
  searchString = '';

  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigate(['/results'], {
      queryParams: { search_query: this.searchString },
    });
  }

  onSettingsClick() {
    this.isSortingOpen = !this.isSortingOpen;
    this.isSettingsPanelOpen.emit(this.isSortingOpen);
  }
}
