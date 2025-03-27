import { Component, inject } from '@angular/core';
import { SearchResultsService } from '../search-results/search-results.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectAllCards,
  selectCustomCards,
} from '../../../store/card/custom-card.selectors';
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

  // ngOnInit(): void {
  //   console.log('IS API card ', this.isApiCard);

  //   this.videoId = this.route.snapshot.paramMap.get('videoId') as string;
  //   this.searchResultsService
  //     .getVideoDetails([this.videoId])
  //     .subscribe((value: any) => {
  //       this.videoDetails = value.items[0];
  //     });
  //   if (!this.videoDetails) {
  //     this.store.select(selectCustomCards).subscribe((cardsData) => {
  //       console.log('CARDS DATA', cardsData);
  //       const filteredVideo = cardsData.find(
  //         (video) => video.id === this.videoId
  //       );
  //       console.log('FILTERED VIDEO', filteredVideo);
  //       this.videoDetails = filteredVideo;
  //     });
  //   }
  // }

  ngOnInit(): void {
    this.videoId = this.route.snapshot.paramMap.get('videoId') as string;

    // Combine API and store data
    combineLatest([
      this.searchResultsService.getVideoDetails([this.videoId]),
      this.store.select(selectCustomCards),
    ])
      .pipe(
        map(([apiData, customCards]) => {
          // Try to find the video in API data first
          const apiVideo = (apiData as { items: any[] }).items[0];
          if (apiVideo) return apiVideo;

          // If not found in API data, try to find it in custom cards
          const customVideo = customCards.find(
            (video: { id: string }) => video.id === this.videoId
          );
          return customVideo || null; // Return null if not found
        })
      )
      .subscribe((video: any) => {
        this.videoDetails = video;
        console.log('Video Details:', this.videoDetails);
      });
  }

  // Go back to the previous page
  goBack(): void {
    this.location.back();
  }

  // Check if it's an API card
  get isApiCard(): boolean {
    console.log('THIS VIDEODETAILS', this.videoDetails);
    return !this.videoDetails?.isCustomCard;
  }
  // Getter for published date
  get publishedAt(): string {
    return this.isApiCard
      ? this.videoDetails?.snippet?.publishedAt
      : this.videoDetails?.publishedAt;
  }

  // Getter for image URL
  get imageUrl(): string {
    return this.isApiCard
      ? this.videoDetails?.snippet?.thumbnails?.high?.url
      : this.videoDetails?.imageLink;
  }

  // Getter for title
  get title(): string {
    return this.isApiCard
      ? this.videoDetails?.snippet?.title
      : this.videoDetails?.title;
  }

  // Getter for description
  get description(): string {
    return this.isApiCard
      ? this.videoDetails?.snippet?.description
      : this.videoDetails?.description;
  }

  // Stats (views, likes, comments)
  get viewCount(): number {
    return this.isApiCard ? this.videoDetails?.statistics?.viewCount : 0; // Default for custom cards
  }

  get likeCount(): number {
    return this.isApiCard ? this.videoDetails?.statistics?.likeCount : 0; // Default for custom cards
  }

  get commentCount(): number {
    return this.isApiCard ? this.videoDetails?.statistics?.commentCount : 0; // Default for custom cards
  }
}
