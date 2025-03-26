import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  standalone: false,
})
export class FavoritesComponent {
  favorites$: Observable<any[]>;

  constructor(private store: Store<{ favorites: { videos: any[] } }>) {
    this.favorites$ = this.store.select((state) => state.favorites.videos);
    this.favorites$.subscribe((a) => console.log(a));
  }
}
