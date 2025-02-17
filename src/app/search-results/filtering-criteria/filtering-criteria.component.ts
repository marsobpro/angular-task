import { Component } from '@angular/core';

@Component({
  selector: 'app-filtering-criteria',
  imports: [],
  templateUrl: './filtering-criteria.component.html',
  styleUrl: './filtering-criteria.component.scss',
})
export class FilteringCriteriaComponent {
  searchCriteria = [
    { name: 'date', value: 'date' },
    { name: 'count of views', value: 'views' },
    { name: 'by word or sentence', value: 'wordOrSentence' },
  ];

  applySearch(criteria: string) {
    console.log(`Applying search for: ${criteria}`);
  }
}
