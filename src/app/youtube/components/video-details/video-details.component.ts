import { Component, inject } from '@angular/core';
import { SearchResultsService } from '../search-results/search-results.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCustomCards } from '../../../store/card/custom-card.selectors';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-video-details',
  standalone: false,
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
})
export class VideoDetailsComponent {
  videoId = '';
  videoDetails: any;
  private searchResultsService = inject(SearchResultsService);

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.videoId = this.route.snapshot.paramMap.get('videoId') as string;

    combineLatest([
      this.searchResultsService.getVideoDetails([this.videoId]),
      this.store.select(selectCustomCards),
    ])
      .pipe(
        map(([apiData, customCards]) => {
          const apiVideo = (apiData as { items: any[] }).items[0];
          if (apiVideo) return apiVideo;

          //If it's a custom card, get it from saved cards:
          const customVideo = customCards.find(
            (video: { id: string }) => video.id === this.videoId
          );
          return customVideo || null;
        })
      )
      .subscribe((video: any) => {
        this.videoDetails = video;
      });
  }

  goBack(): void {
    this.location.back();
  }

  get isApiCard(): boolean {
    return !this.videoDetails?.isCustomCard;
  }
  get publishedAt(): string {
    return this.isApiCard
      ? this.videoDetails?.snippet?.publishedAt
      : this.videoDetails?.publishedAt;
  }

  get imageUrl(): string {
    return this.isApiCard
      ? this.videoDetails?.snippet?.thumbnails?.high?.url
      : this.videoDetails?.imageLink;
  }

  get title(): string {
    return this.isApiCard
      ? this.videoDetails?.snippet?.title
      : this.videoDetails?.title;
  }

  get description(): string {
    return this.isApiCard
      ? this.videoDetails?.snippet?.description
      : this.videoDetails?.description;
  }

  get viewCount(): number {
    return this.isApiCard ? this.videoDetails?.statistics?.viewCount : 0;
  }

  get likeCount(): number {
    return this.isApiCard ? this.videoDetails?.statistics?.likeCount : 0;
  }

  get commentCount(): number {
    return this.isApiCard ? this.videoDetails?.statistics?.commentCount : 0;
  }

  get tags(): [] {
    return this.isApiCard ? [] : this.videoDetails?.tags || [];
  }
}
