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
    const updatedCriteria = this.searchCriteria.map((criterion) => {
      if (criterion.value !== selectedCriterion.value) {
        return { ...criterion, direction: SortDirection.None };
      }

      if (selectedCriterion.value === FilterValue.WordOrSentence) {
        return { ...criterion, showInput: !criterion.showInput };
      }

      let newDirection: SortDirection.Ascending | SortDirection.Descending;

      newDirection =
        criterion.direction === SortDirection.Ascending ||
        criterion.direction === SortDirection.None
          ? SortDirection.Descending
          : SortDirection.Ascending;

      return { ...criterion, direction: newDirection };
    });

    this.searchCriteria = updatedCriteria;

    const emittedCriterion = updatedCriteria.find(
      (criterion) => criterion.value === selectedCriterion.value
    );
    if (emittedCriterion) {
      this.filterCriterion.emit(emittedCriterion);
    }
  }

  onSearch() {
    this.search.emit(this.searchString);
  }
}
