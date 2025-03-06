import { FilterValue, SortDirection } from '../enums/results.enum';

export interface SearchCriterion {
  name: string;
  value: FilterValue;
  direction: SortDirection;
  showInput?: boolean;
}

export interface YouTubeSearchResponse {
  etag: string;
  items: [];
  kind: string;
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  regionCode?: string;
}
