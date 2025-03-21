import { createReducer, on } from '@ngrx/store';
import * as CardActions from './custom-card.actions';

export interface CardState {
  cards: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CardState = {
  cards: [],
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
    cards: [...state.cards, card],
  })),

  //Deleting card
  on(CardActions.deleteCard, (state) => ({ ...state, loading: true }))
);
