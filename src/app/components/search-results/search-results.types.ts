export interface SearchCriterion {
  name: string;
  value: string;
  direction: 'asc' | 'desc' | 'none';
  showInput?: boolean;
}
