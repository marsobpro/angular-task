import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';
import { SearchResultsService } from '../../../youtube/components/search-results/search-results.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Output() isSettingsPanelOpen = new EventEmitter();

  isSortingOpen = false;
  searchStringSubject = new Subject<string>();
  isLoggedIn = false;

  constructor(
    private router: Router,
    private searchResultsService: SearchResultsService,
    private authService: AuthService
  ) {
    this.authService.data$.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
    this.searchStringSubject
      .pipe(
        debounceTime(300),
        filter((value) => value.length > 3),
        distinctUntilChanged()
      )
      .subscribe((value) => this.performSearch(value));
  }

  onSearchChange(event: KeyboardEvent) {
    if (!event) return;
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.searchStringSubject.next(value);
  }

  performSearch(value: any) {
    if (value.trim()) {
      this.router.navigate(['/results'], {
        queryParams: { search_query: value },
      });
    }
  }

  onSettingsClick() {
    this.searchResultsService.toggleIsSettingsPanelOpen();
  }

  onLogout() {
    this.authService.logout();
  }
}
