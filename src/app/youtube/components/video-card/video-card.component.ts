import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  standalone: false,
})
export class VideoCardComponent {
  @Input() video: any;

  // Function to check if it's an API card
  get isApiCard(): boolean {
    return (
      this.video &&
      this.video.snippet &&
      this.video.snippet.publishedAt !== undefined
    );
  }

  // Getter for the published date, depending on card type
  get publishedAt(): string {
    return this.isApiCard
      ? this.video.snippet.publishedAt
      : this.video.publishedAt;
  }

  // Getter for the image URL, depending on card type
  get imageUrl(): string {
    return this.isApiCard
      ? this.video.snippet.thumbnails.medium.url
      : this.video.imageLink;
  }

  // Getter for the title, depending on card type
  get title(): string {
    return this.isApiCard ? this.video.snippet.title : this.video.title;
  }

  // Other properties (views, likes, etc.) can follow similar logic
  get viewCount(): number {
    return this.isApiCard ? this.video.statistics.viewCount : 0; // Set a default or custom logic
  }

  get likeCount(): number {
    return this.isApiCard ? this.video.statistics.likeCount : 0; // Set a default or custom logic
  }

  get commentCount(): number {
    return this.isApiCard ? this.video.statistics.commentCount : 0; // Set a default or custom logic
  }
}
