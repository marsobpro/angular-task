import { Injectable } from '@angular/core';
import { YouTubeSearchResponse } from '../../models/search-results.model';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class SearchResultsService {
  private isSettingsPanelOpenSubject = new BehaviorSubject(false);
  isSettingsPanelOpen$ = this.isSettingsPanelOpenSubject.asObservable();
  private maxResults = 10;
  private apiKey = 'AIzaSyBriZ8PjXKBYpARj6ShgGoBicsPzR1qSII';
  videosFound!: any;

  constructor(private httpClient: HttpClient, private store: Store) {}

  toggleIsSettingsPanelOpen() {
    const currentState = this.isSettingsPanelOpenSubject.getValue();
    this.isSettingsPanelOpenSubject.next(!currentState);
  }

  setIsSettingsPanelOpen(open: boolean) {
    this.isSettingsPanelOpenSubject.next(open);
  }

  getVideoDetails(videoIds: string[], pageToken: string | null = null) {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(
      ','
    )}&pageToken=${pageToken ?? ''}&key=${this.apiKey}`;

    return this.httpClient.get(url);
  }
  getSearchResults(searchString: string = '', pageToken: string | null = null) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      searchString
    )}&type=video&maxResults=${this.maxResults}&pageToken=${
      pageToken ?? ''
    }&key=${this.apiKey}`;

    return this.fetchVideos(url).pipe(
      map((data) => {
        this.videosFound = data;
        return data;
      })
    );
  }

  getVideoById(videoId: string) {
    return this.getVideoDetails([videoId]).pipe(
      map((response: any) => {
        return response.items[0];
      })
    );
  }

  private fetchVideos(url: string) {
    return this.httpClient.get<any>(url);
  }
}
