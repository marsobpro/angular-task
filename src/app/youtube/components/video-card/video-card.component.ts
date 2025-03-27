import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as CardActions from '../../../store/card/custom-card.actions';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../../store/favorites/favorites.actions';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  standalone: false,
})
export class VideoCardComponent {
  @Input() video: any;
  favorites$: Observable<any[]>;
  isFavorite$: Observable<boolean>;

  constructor(private store: Store<{ favorites: { videos: any[] } }>) {
    this.favorites$ = this.store.select((state) => state.favorites.videos);
    this.isFavorite$ = this.favorites$.pipe(
      map((favorites) => {
        const isFavorite = favorites.some(
          (favVideo) => favVideo.id === this.video.id
        );
        return isFavorite;
      })
    );
  }

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
    alert(
      'Video added to favorites. See all favorite videos by clicking at heart icon in the navbar.'
    );
  }

  removeFromFavorites(id: any) {
    this.store.dispatch(removeFromFavorites({ videoId: id }));
    alert('Video removed from favtorites.');
  }
}
