import { inject, Injectable } from '@angular/core';
import {
  SearchCriterion,
  YouTubeSearchResponse,
} from '../../models/search-results.model';
import { BehaviorSubject, map, tap } from 'rxjs';
import { FilterValue, SortDirection } from '../../enums/results.enum';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SearchResultsService {
  private isSettingsPanelOpenSubject = new BehaviorSubject(false);
  isSettingsPanelOpen$ = this.isSettingsPanelOpenSubject.asObservable();
  private maxResults = 10;
  private apiKey = 'AIzaSyBriZ8PjXKBYpARj6ShgGoBicsPzR1qSII';
  videosFound: any;

  constructor(private httpClient: HttpClient) {}

  toggleIsSettingsPanelOpen() {
    const currentState = this.isSettingsPanelOpenSubject.getValue();
    this.isSettingsPanelOpenSubject.next(!currentState);
  }

  setIsSettingsPanelOpen(open: boolean) {
    this.isSettingsPanelOpenSubject.next(open);
  }

  // getVideo(id: string) {
  //   return this.videosFound.find((video) => video.id === id);
  // }
  // getVideoStatistics(videoIds: string[]) {
  //   const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds.join(
  //     ','
  //   )}&key=${this.apiKey}`;
  //   return this.httpClient.get(url);
  // }

  getVideoDetails(videoIds: string[]) {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(
      ','
    )}&key=${this.apiKey}`;
    return this.httpClient.get(url);
  }

  getSearchResults(searchString: string = '') {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      searchString
    )}&type=video&maxResults=${this.maxResults}&key=${this.apiKey}`;

    return this.fetchVideos(url).pipe(
      map((data) => {
        this.videosFound = data;
        return data;
      })
    );
  }

  getFilteredResults(searchCriterion: SearchCriterion, videosFound: any) {
    return this.sortResults(videosFound, searchCriterion);
  }

  private compareValues(a: number, b: number, direction: SortDirection) {
    return direction === SortDirection.Ascending ? a - b : b - a;
  }

  private sortResults(results: any[], criterion: SearchCriterion) {
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

  private fetchVideos(url: string) {
    console.log('--------------FETCHING VIDEOS---------------');
    return this.httpClient.get<YouTubeSearchResponse>(url);
  }
}
