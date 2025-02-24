import { Component, EventEmitter, Output } from '@angular/core';

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

  onSubmit() {
    this.searchQuery.emit(this.searchString);
  }

  onSettingsClick() {
    this.isSortingOpen = !this.isSortingOpen;
    this.isSettingsPanelOpen.emit(this.isSortingOpen);
  }
}
