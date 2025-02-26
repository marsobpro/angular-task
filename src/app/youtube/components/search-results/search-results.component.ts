import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { SearchResultsService } from './search-results.service';
import { SearchCriterion } from './search-results.types';
import { FilteringCriteriaComponent } from '../filtering-criteria/filtering-criteria.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  standalone: false,
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnChanges, OnDestroy {
  searchQuery = '';
  @Input() filterCriterion: SearchCriterion = {
    name: '',
    value: '',
    direction: 'none',
  };
  private searchResultsService = inject(SearchResultsService);
  filteredResultsArray: any[] = [];
  isSettingsPanelOpen = false;
  private subscription: Subscription | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription =
      this.searchResultsService.isSettingsPanelOpen$.subscribe((open) => {
        this.isSettingsPanelOpen = open;
      });

    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['search_query'];
      this.updateSearchResults();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterCriterion']) {
      this.updateSearchResults();
    }
  }

  private updateSearchResults() {
    this.filteredResultsArray = this.searchResultsService.getSearchResults(
      this.searchQuery,
      this.filterCriterion
    );
  }

  handleFilterCriterionChange(criterion: SearchCriterion) {
    this.filterCriterion = criterion;
    this.updateSearchResults();
  }

  onWordOrSentenceSearch(searchString: string) {
    this.searchQuery = searchString;
    this.updateSearchResults();
  }
}
