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
import { catchError, NEVER, Subscription, switchMap } from 'rxjs';
import { FilterValue, SortDirection } from '../../enums/results.enum';
import { SearchParams } from '../../enums/search-queries.enum';
import { Store } from '@ngrx/store';
import { selectAllCards } from '../../../store/card/custom-card.selectors';

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
  customCards: any;
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

    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params[SearchParams.SEARCH_QUERY];
      this.updateSearchResults();
    });

    this.store.select(selectAllCards).subscribe((cardsData) => {
      this.customCards = cardsData;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private updateSearchResults() {
    this.searchResultsService
      .getSearchResults(this.searchQuery)
      .pipe(
        switchMap((response) => {
          const videoIds = response.items.map((item: any) => item.id.videoId);
          return this.searchResultsService.getVideoDetails(videoIds);
        }),
        catchError((error) => {
          console.error(error);
          return NEVER;
        })
      )
      .subscribe((data: any) => {
        this.originalResultsArray = data.items;
        this.updateFilteredResults();
      });
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

    console.log('CUSTOM CARDS', this.customCards);

    if (this.customCards) {
      results = [...this.customCards, ...results];
    }

    this.filteredResultsArray = results;
  }
}
