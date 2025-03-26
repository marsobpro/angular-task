import { createAction, props } from '@ngrx/store';
export interface Card {
  title: string;
  description: string;
  imgLink: string;
  videoLink: string;
  creationDate: string;
}

export const ADD_TO_FAVORITES = '[Favorites] Add to favorites';
export const REMOVE_FROM_FAVORITES = '[Favorites] Remove from favorites';

export const addToFavorites = createAction(
  '[Favorites] Add to Favorites',
  props<{ video: any }>()
);

export const removeFromFavorites = createAction(
  '[Favorites] Remove from Favorites',
  props<{ videoId: string }>()
);
