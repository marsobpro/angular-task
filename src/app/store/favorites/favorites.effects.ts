import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as CardActions from '../../store/card/custom-card.actions';
import { SearchResultsService } from '../../youtube/components/search-results/search-results.service';

@Injectable()
export class CustomCardEffect {
  actions$ = inject(Actions);
  constructor(private searchResultsService: SearchResultsService) {}

  getVideos = createEffect(() =>
    this.actions$.pipe(
      ofType(CardActions.getVideos),
      switchMap(({ searchQuery }) => {
        return this.searchResultsService.getSearchResults(searchQuery).pipe(
          catchError(() => {
            return of([]);
          })
        );
      }),
      switchMap((data) => {
        const videoIds = data.items.map((item: any) => item.id.videoId);
        return this.searchResultsService.getVideoDetails(videoIds);
      }),
      map((data) => {
        return CardActions.getVideosSuccess({ data });
      }),
      catchError(() => {
        return of(CardActions.getVideosError());
      })
    )
  );
}
