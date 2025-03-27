import { createReducer, on } from '@ngrx/store';
import * as FavoritesAction from '../../store/favorites/favorites.actions';

export interface FavoritesState {
  videos: any[];
}

export const initialState: FavoritesState = {
  videos: [],
};

export const favoritesReducer = createReducer(
  initialState,
  //Adding to favorites
  on(FavoritesAction.addToFavorites, (state, { video }) => {
    const videoExists = state.videos.some((v) => v.id === video.id);
    if (videoExists) {
      alert('Video already exists in favorites');
      return state;
    }
    return {
      ...state,
      videos: [...state.videos, video],
    };
  }),

  // Removing from favorites
  on(FavoritesAction.removeFromFavorites, (state, { videoId }) => ({
    ...state,
    videos: state.videos.filter((video) => video.id !== videoId),
  }))
);
