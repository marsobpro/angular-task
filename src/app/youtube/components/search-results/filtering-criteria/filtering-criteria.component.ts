import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchCriterion } from '../search-results.types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtering-criteria',
  imports: [FormsModule],
  templateUrl: './filtering-criteria.component.html',
  styleUrl: './filtering-criteria.component.scss',
})
export class FilteringCriteriaComponent {
  @Input() isSettingsOpen = false;
  @Output() filterCriterion = new EventEmitter<SearchCriterion>();
  @Output() search = new EventEmitter<string>();
  searchString = '';
  searchCriteria: SearchCriterion[] = [
    { name: 'date', value: 'date', direction: 'none' },
    { name: 'count of views', value: 'views', direction: 'none' },
    {
      name: 'by word or sentence',
      value: 'wordOrSentence',
      direction: 'none',
      showInput: false,
    },
  ];

  handleCriterionClick(selectedCriterion: SearchCriterion) {
    this.searchCriteria = this.searchCriteria.map((criterion) => {
      if (criterion.value === selectedCriterion.value) {
        // Show input for word or sentence and return
        if (selectedCriterion.value === 'wordOrSentence') {
          return { ...criterion, showInput: !criterion.showInput };
        }

        // Handle date and views filters
        let newDirection: 'asc' | 'desc';
        if (selectedCriterion.direction === 'none') {
          newDirection = 'asc';
        } else {
          newDirection = criterion.direction === 'asc' ? 'desc' : 'asc';
        }
        this.filterCriterion.emit(criterion);
        return { ...criterion, direction: newDirection };
      }
      return criterion;
    });
  }

  onSearch() {
    this.search.emit(this.searchString);
  }
}
