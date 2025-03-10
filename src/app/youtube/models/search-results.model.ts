import { FilterValue, SortDirection } from '../enums/results.enum';

export interface SearchCriterion {
  name: string;
  value: FilterValue;
  direction: SortDirection;
  showInput?: boolean;
}
