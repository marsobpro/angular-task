import { Component, inject, Input } from '@angular/core';
import { FilteringCriteriaComponent } from './filtering-criteria/filtering-criteria.component';
import { SearchResultsService } from './search-results.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  imports: [
    FilteringCriteriaComponent,
    MatCardModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  @Input() searchString = '';
  @Input() isSettingsOpen!: boolean;
  filterCriterion = '';
  private searchResultsService = inject(SearchResultsService);

  get searchResults() {
    return this.searchResultsService.getSearchResults(
      this.searchString,
      this.filterCriterion
    );
  }

  getBorderColor(date: string) {
    const currentDate = new Date();
    const dateDifference = currentDate.getTime() - new Date(date).getTime();
    const differenceInDays = dateDifference / (1000 * 3600 * 24);

    if (differenceInDays > 180) {
      return 'red';
    } else if (differenceInDays >= 30 && differenceInDays <= 180) {
      return 'yellow';
    } else if (differenceInDays >= 7 && differenceInDays <= 30) {
      return 'green';
    } else {
      return 'blue';
    }
  }

  handleFilterCriterionChange(criterion: string) {
    this.filterCriterion = criterion;
  }
}
