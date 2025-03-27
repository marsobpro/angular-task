import { createSelector } from '@ngrx/store';

export const selectFavoritesState = (state: { favorites: { videos: any[] } }) =>
  state.favorites;

export const selectFavoritesVideos = createSelector(
  selectFavoritesState,
  (favoritesState) => favoritesState.videos
);
