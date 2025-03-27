import { createReducer, on } from '@ngrx/store';
import * as CardActions from './custom-card.actions';

export interface CardState {
  customCards: any[];
  apiCards: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CardState = {
  customCards: [],
  apiCards: [],
  loading: false,
  error: null,
};

export const cardReducer = createReducer(
  initialState,

  //Loading cards
  on(CardActions.loadCards, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CardActions.loadCardsSuccess, (state, { cards }) => ({
    ...state,
    loading: false,
    cards,
  })),

  //Creating card
  on(CardActions.createCard, (state, { card }) => ({
    ...state,
    loading: true,
    customCards: [...state.customCards, card],
  })),

  //Deleting card
  on(CardActions.deleteCard, (state, { id }) => {
    return {
      ...state,
      customCards: state.customCards.filter((card) => card.id !== id),
      loading: false,
      error: null,
    };
  }),

  on(CardActions.getVideos, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(CardActions.getVideosSuccess, (state, { data }) => {
    return {
      ...state,
      loading: false,
      apiCards: data.items,
    };
  }),

  on(CardActions.getVideosError, (state) => {
    return {
      ...state,
      loading: false,
      apiCards: [],
    };
  })
);
