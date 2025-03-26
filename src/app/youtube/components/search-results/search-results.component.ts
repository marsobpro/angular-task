import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SearchResultsService } from './search-results.service';
import { SearchCriterion } from '../../models/search-results.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterValue, SortDirection } from '../../enums/results.enum';
import { SearchParams } from '../../enums/search-queries.enum';
import { Store } from '@ngrx/store';
import { selectAllCards } from '../../../store/card/custom-card.selectors';
import * as CardActions from '../../../store/card/custom-card.actions';

@Component({
  selector: 'app-search-results',
  standalone: false,
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  searchQuery = '';
  @Input() filterCriterion: SearchCriterion = {
    name: '',
    value: FilterValue.None,
    direction: SortDirection.None,
  };
  private searchResultsService = inject(SearchResultsService);
  private subscription: Subscription | undefined;
  allCards: any;
  originalResultsArray: any;
  filteredResultsArray: any;

  isSettingsPanelOpen = false;

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.subscription =
      this.searchResultsService.isSettingsPanelOpen$.subscribe(
        (open) => (this.isSettingsPanelOpen = open)
      );

    this.store.select(selectAllCards).subscribe((cardsData) => {
      this.allCards = cardsData;
      this.filteredResultsArray = cardsData;
    });

    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params[SearchParams.SEARCH_QUERY];
      this.updateSearchResults();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private updateSearchResults() {
    this.store.dispatch(
      CardActions.getVideos({ searchQuery: this.searchQuery })
    );
  }

  handleFilterCriterionChange(criterion: SearchCriterion) {
    this.filterCriterion = criterion;
    this.cdRef.detectChanges();
    this.updateFilteredResults();
  }

  onWordOrSentenceSearch(searchString: string) {
    this.updateFilteredResults(searchString);
  }

  private updateFilteredResults(searchString?: string) {
    if (!this.originalResultsArray) return;

    let results = this.originalResultsArray;

    if (searchString) {
      results = results.filter((result: any) => {
        const title = result?.snippet?.title ?? '';
        return title
          .trim()
          .toLowerCase()
          .includes(searchString.trim().toLowerCase());
      });
    }

    if (this.allCards) {
      results = [...this.allCards, ...results];
    }

    this.filteredResultsArray = results;
  }
}
