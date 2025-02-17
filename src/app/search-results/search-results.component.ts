import { Component, inject } from '@angular/core';
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
  private searchResultsService = inject(SearchResultsService);

  ngOnInit(): void {
    const currentDate = new Date();
    console.log('Date', currentDate);
    const tempDate =
      this.searchResultsService.mockedSearchData[0].snippet.publishedAt;
    console.log('tempdate', new Date(tempDate).getDay());
  }

  get searchResults() {
    return this.searchResultsService.mockedSearchData;
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
}
