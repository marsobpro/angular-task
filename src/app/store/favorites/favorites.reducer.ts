import { createReducer, on } from '@ngrx/store';
import * as CardActions from '../../store/card/custom-card.actions';
import { addToFavorites, removeFromFavorites } from './favorites.actions';

export interface FavoritesState {
  videos: any[];
}

export const initialState: FavoritesState = {
  videos: [],
};

export const favoritesReducer = createReducer(
  initialState,
  on(addToFavorites, (state, { video }) => {
    console.log('Adding video to favorites:', video); // Log the video being passed
    return {
      ...state,
      videos: [...state.videos, video],
    };
  }),
  on(removeFromFavorites, (state, { videoId }) => ({
    ...state,
    videos: state.videos.filter((video) => video.id.videoId !== videoId),
  }))
);
