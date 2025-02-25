import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResultsService } from '../../../youtube/components/search-results/search-results.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() isSettingsPanelOpen = new EventEmitter();

  isSortingOpen = false;
  searchString = '';

  constructor(
    private router: Router,
    private searchResultsService: SearchResultsService
  ) {}

  onSubmit() {
    this.router.navigate(['/results'], {
      queryParams: { search_query: this.searchString },
    });
  }

  onSettingsClick() {
    this.searchResultsService.toggleIsSettingsPanelOpen();
  }
}
