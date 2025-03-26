import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CardActions from '../../../store/card/custom-card.actions';
import { addToFavorites } from '../../../store/favorites/favorites.actions';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  standalone: false,
})
export class VideoCardComponent {
  @Input() video: any;

  constructor(
    private store: Store,

    private cdRef: ChangeDetectorRef
  ) {}

  get isApiCard(): boolean {
    return (
      this.video &&
      this.video.snippet &&
      this.video.snippet.publishedAt !== undefined
    );
  }

  get publishedAt(): string {
    return this.isApiCard
      ? this.video.snippet.publishedAt
      : this.video.publishedAt;
  }

  get imageUrl(): string {
    return this.isApiCard
      ? this.video.snippet.thumbnails.medium.url
      : this.video.imageLink;
  }

  get title(): string {
    return this.isApiCard ? this.video.snippet.title : this.video.title;
  }

  get viewCount(): number {
    return this.isApiCard ? this.video.statistics.viewCount : 0;
  }

  get likeCount(): number {
    return this.isApiCard ? this.video.statistics.likeCount : 0;
  }

  get commentCount(): number {
    return this.isApiCard ? this.video.statistics.commentCount : 0;
  }

  deleteCard(id: string) {
    this.store.dispatch(CardActions.deleteCard({ id }));
    alert('You deleted your custom card');
  }

  addToFavorites(video: any) {
    this.store.dispatch(addToFavorites({ video }));
  }
}
