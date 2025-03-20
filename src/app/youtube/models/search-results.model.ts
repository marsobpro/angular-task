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

export interface VideoItem {
  etag: string;
  id: string;
  kind: string;
  snippet: VideoSnippet;
  statistics: VideoStatistics;
}

export interface VideoSnippet {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  localized: VideoLocalized;
  publishedAt: string;
  tags: string[];
  thumbnails: VideoThumbnails;
  title: string;
}

export interface VideoLocalized {
  title: string;
  description: string;
}

export interface VideoThumbnails {
  default: VideoThumbnail;
  medium: VideoThumbnail;
  high: VideoThumbnail;
  standard: VideoThumbnail;
  maxres: VideoThumbnail;
}

export interface VideoThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface VideoStatistics {
  commentCount: string;
  favoriteCount: string;
  likeCount: string;
  viewCount: string;
}
