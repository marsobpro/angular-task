import { Pipe, PipeTransform } from '@angular/core';
import { SearchCriterion } from '../models/search-results.model';
import { FilterValue, SortDirection } from '../enums/results.enum';

@Pipe({
  name: 'sortResults',
})
export class SortResultsPipe implements PipeTransform {
  private compareValues(a: number, b: number, direction: SortDirection) {
    return direction === SortDirection.Ascending ? a - b : b - a;
  }

  transform(results: any[], criterion: SearchCriterion) {
    if (
      !results ||
      !criterion ||
      criterion.value === FilterValue.None ||
      criterion.direction === SortDirection.None
    ) {
      return results;
    }
    const { value, direction } = criterion;
    if (value === FilterValue.Views) {
      return results.sort((a, b) =>
        this.compareValues(
          a.statistics.viewCount,
          b.statistics.viewCount,
          direction
        )
      );
    }

    if (value === FilterValue.Date) {
      return results.sort((a, b) =>
        this.compareValues(
          new Date(a.snippet.publishedAt).getTime(),
          new Date(b.snippet.publishedAt).getTime(),
          direction
        )
      );
    }

    return results;
  }
}
