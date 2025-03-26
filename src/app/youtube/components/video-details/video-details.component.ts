import { Component, inject } from '@angular/core';
import { SearchResultsService } from '../search-results/search-results.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.videoId = this.route.snapshot.paramMap.get('videoId') as string;
    this.searchResultsService
      .getVideoDetails([this.videoId])
      .subscribe((value: any) => {
        this.videoDetails = value.items[0];
      });
  }

  // Go back to the previous page
  goBack(): void {
    this.location.back();
  }

  // Check if it's an API card
  get isApiCard(): boolean {
    return (
      this.videoDetails &&
      this.videoDetails.snippet &&
      this.videoDetails.snippet.publishedAt !== undefined
    );
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
