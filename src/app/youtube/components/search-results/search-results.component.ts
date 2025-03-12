import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { SearchResultsService } from './search-results.service';
import { SearchCriterion } from '../../models/search-results.model';
import { ActivatedRoute } from '@angular/router';
import { catchError, NEVER, Subscription, switchMap } from 'rxjs';
import { FilterValue, SortDirection } from '../../enums/results.enum';
import { SearchParams } from '../../enums/search-queries.enum';

@Component({
  selector: 'app-search-results',
  standalone: false,
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnDestroy {
  searchQuery = '';
  @Input() filterCriterion: SearchCriterion = {
    name: '',
    value: FilterValue.None,
    direction: SortDirection.None,
  };
  private searchResultsService = inject(SearchResultsService);
  private subscription: Subscription | undefined;

  filteredResultsArray: any;
  originalResultsArray: any;

  isSettingsPanelOpen = false;

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription =
      this.searchResultsService.isSettingsPanelOpen$.subscribe((open) => {
        this.isSettingsPanelOpen = open;
      });

    // UNCOMMENT

    // this.route.queryParams.subscribe((params) => {
    //   this.searchQuery = params[SearchParams.SEARCH_QUERY];
    //   this.updateSearchResults();
    // });
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
          const videosFound =
            this.searchResultsService.getVideoDetails(videoIds);

          return videosFound;
        }),
        catchError((error) => {
          console.error(error);
          return NEVER;
        })
      )
      .subscribe((data: any) => {
        return (this.filteredResultsArray = data.items);
      });
  }

  handleFilterCriterionChange(criterion: SearchCriterion) {
    this.filterCriterion = criterion;
    this.cdRef.detectChanges();
  }

  onWordOrSentenceSearch(searchString: string) {
    if (searchString.trim() === '') {
      this.filteredResultsArray = this.originalResultsArray;
      return this.filteredResultsArray;
    }

    if (!this.originalResultsArray) {
      this.originalResultsArray = this.filteredResultsArray;
    }

    const normalizedSearchString = searchString.trim().toLowerCase();

    this.filteredResultsArray = this.originalResultsArray.filter(
      (result: any) => {
        const title = result?.snippet?.title ?? '';
        return title.trim().toLowerCase().includes(normalizedSearchString);
      }
    );

    return this.filteredResultsArray;
  }
}
