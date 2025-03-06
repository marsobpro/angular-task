import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { SearchResultsService } from './search-results.service';
import {
  SearchCriterion,
  YouTubeSearchResponse,
} from '../../models/search-results.model';
import { ActivatedRoute } from '@angular/router';
import { catchError, forkJoin, NEVER, of, Subscription, switchMap } from 'rxjs';
import { FilterValue, SortDirection } from '../../enums/results.enum';

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
  filteredResultsArray: any;
  isSettingsPanelOpen = false;
  private subscription: Subscription | undefined;
  videosFound: any;
  originalResultsArray: any;

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

  private updateSearchResults() {
    this.searchResultsService
      .getSearchResults(this.searchQuery)
      .pipe(
        switchMap((response) => {
          const videoIds = response.items.map((item: any) => item.id.videoId);
          this.videosFound =
            this.searchResultsService.getVideoDetails(videoIds);

          return this.videosFound;
        }),
        catchError((error) => {
          console.error(error);
          return NEVER;
        })
      )
      .subscribe((data: any) => (this.filteredResultsArray = data.items));
  }

  handleFilterCriterionChange(criterion: SearchCriterion) {
    this.filterCriterion = criterion;
    return this.searchResultsService.getFilteredResults(
      criterion,
      this.filteredResultsArray
    );
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
