import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() search = new EventEmitter();
  @Output() isSettingsOpen = new EventEmitter();

  isSortingOpen = false;
  searchString = '';

  onSubmit() {
    this.search.emit(this.searchString);
  }

  onSettingsClick() {
    this.isSortingOpen = !this.isSortingOpen;
    this.isSettingsOpen.emit(this.isSortingOpen);
  }
}
