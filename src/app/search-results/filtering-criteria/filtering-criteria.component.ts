import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filtering-criteria',
  imports: [],
  templateUrl: './filtering-criteria.component.html',
  styleUrl: './filtering-criteria.component.scss',
})
export class FilteringCriteriaComponent {
  @Input() isSettingsOpen = false;
  @Output() filterCriterion = new EventEmitter();
  searchCriteria = [
    { name: 'date', value: 'date' },
    { name: 'count of views', value: 'views' },
    { name: 'by word or sentence', value: 'wordOrSentence' },
  ];

  handleCriterionClick(criterion: string) {
    this.filterCriterion.emit(criterion);
  }
}
