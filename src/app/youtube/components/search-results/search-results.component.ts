import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { SearchResultsService } from './search-results.service';
import { SearchCriterion } from './search-results.types';
import { FilteringCriteriaComponent } from '../filtering-criteria/filtering-criteria.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: false,
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnChanges {
  searchQuery = '';
  @Input() isSettingsPanelOpen!: boolean;
  @Input() filterCriterion: SearchCriterion = {
    name: '',
    value: '',
    direction: 'none',
  };
  private searchResultsService = inject(SearchResultsService);
  filteredResultsArray: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('RESULTS INITIALIZED');
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['search_query'];
      console.log('Received search query:', this.searchQuery);
      this.updateSearchResults();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('RESULTS INITIALIZED');

    if (changes['filterCriterion']) {
      console.log('IN FIRST IF');
      this.updateSearchResults();
    }
  }

  private updateSearchResults() {
    console.log('IN UPDATE SEARCH RESULTS');
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
