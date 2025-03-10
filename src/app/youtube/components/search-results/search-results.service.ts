import { Injectable } from '@angular/core';
import { YouTubeSearchResponse } from '../../models/search-results.model';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SearchResultsService {
  private isSettingsPanelOpenSubject = new BehaviorSubject(false);
  isSettingsPanelOpen$ = this.isSettingsPanelOpenSubject.asObservable();
  private maxResults = 10;
  private apiKey = 'AIzaSyBriZ8PjXKBYpARj6ShgGoBicsPzR1qSII';
  videosFound!: YouTubeSearchResponse;

  constructor(private httpClient: HttpClient) {}

  toggleIsSettingsPanelOpen() {
    const currentState = this.isSettingsPanelOpenSubject.getValue();
    this.isSettingsPanelOpenSubject.next(!currentState);
  }

  setIsSettingsPanelOpen(open: boolean) {
    this.isSettingsPanelOpenSubject.next(open);
  }

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

  private fetchVideos(url: string) {
    console.log('--------------FETCHING VIDEOS---------------');
    return this.httpClient.get<YouTubeSearchResponse>(url);
  }
}
