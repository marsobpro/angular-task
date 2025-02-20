import { Component, inject, Input } from '@angular/core';
import { FilteringCriteriaComponent } from './filtering-criteria/filtering-criteria.component';
import { SearchResultsService } from './search-results.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../shared/button/button.component';
import { SearchCriterion } from './search-results.types';
import { UploadAgeDirective } from '../../directives/upload-age-directive/upload-age.directive';

@Component({
  selector: 'app-search-results',
  imports: [
    FilteringCriteriaComponent,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    ButtonComponent,
    UploadAgeDirective,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  @Input() searchString = '';
  @Input() isSettingsOpen!: boolean;
  filterCriterion: SearchCriterion = { name: '', value: '', direction: 'none' };
  private searchResultsService = inject(SearchResultsService);

  get searchResults() {
    return this.searchResultsService.getSearchResults(
      this.searchString,
      this.filterCriterion
    );
  }

  handleFilterCriterionChange(criterion: SearchCriterion) {
    this.filterCriterion = criterion;
  }
}
