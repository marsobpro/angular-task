import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchCriterion } from '../../models/search-results.model';
import {
  FilterValue,
  SearchCriteriaName,
  SortDirection,
} from '../../enums/results.enum';

@Component({
  selector: 'app-filtering-criteria',
  standalone: false,
  templateUrl: './filtering-criteria.component.html',
  styleUrl: './filtering-criteria.component.scss',
})
export class FilteringCriteriaComponent {
  @Input() isSettingsOpen = false;
  @Output() filterCriterion = new EventEmitter<SearchCriterion>();
  @Output() search = new EventEmitter<string>();
  searchString = '';
  searchCriteria: SearchCriterion[] = [
    {
      name: SearchCriteriaName.Date,
      value: FilterValue.Date,
      direction: SortDirection.None,
    },
    {
      name: SearchCriteriaName.Views,
      value: FilterValue.Views,
      direction: SortDirection.None,
    },
    {
      name: SearchCriteriaName.WordOrSentence,
      value: FilterValue.WordOrSentence,
      direction: SortDirection.None,
      showInput: false,
    },
  ];

  handleCriterionClick(selectedCriterion: SearchCriterion) {
    this.searchCriteria = this.searchCriteria.map((criterion) => {
      if (criterion.value !== selectedCriterion.value) return criterion;

      // Show input for word or sentence and return
      if (selectedCriterion.value === FilterValue.WordOrSentence) {
        return { ...criterion, showInput: !criterion.showInput };
      }

      // Handle date and views filters
      let newDirection: SortDirection.Ascending | SortDirection.Descending;
      if (selectedCriterion.direction === SortDirection.None) {
        newDirection = SortDirection.Ascending;
      } else {
        newDirection =
          criterion.direction === SortDirection.Ascending
            ? SortDirection.Descending
            : SortDirection.Ascending;
      }
      this.filterCriterion.emit(criterion);
      return { ...criterion, direction: newDirection };
    });
  }

  onSearch() {
    this.search.emit(this.searchString);
  }
}
