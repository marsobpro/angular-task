import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, SearchResultsComponent, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'youtube-app';
  searchString = '';
  isSettingsPanelOpen = false;

  onSearchSubmit(data: string) {
    this.searchString = data;
  }

  onSettingsClick(isOpen: boolean) {
    this.isSettingsPanelOpen = isOpen;
  }
}
