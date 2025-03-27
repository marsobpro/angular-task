import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFavoritesVideos } from '../../store/favorites/favorites.selectors';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  standalone: false,
})
export class FavoritesComponent {
  favorites$: Observable<any[]>;

  constructor(private store: Store<{ favorites: { videos: any[] } }>) {
    this.favorites$ = this.store.select(selectFavoritesVideos);
  }
}
