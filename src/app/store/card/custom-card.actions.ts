import { createAction, props } from '@ngrx/store';
export interface Card {
  title: string;
  description: string;
  imgLink: string;
  videoLink: string;
  creationDate: string;
}

export const LOAD_CARDS = '[Custom Card] Load Cards';
export const LOAD_CARDS_SUCCESS = '[Custom Card] Load Cards Success';

export const CREATE_CARD = '[Custom Card] Create Card';

export const DELETE_CARD = '[Custom Card] Delete Card';

export const loadCards = createAction(LOAD_CARDS);
export const loadCardsSuccess = createAction(
  LOAD_CARDS_SUCCESS,
  props<{ cards: any[] }>()
);

//Creating card
export const createCard = createAction(CREATE_CARD, props<{ card: any }>());

//Deleting card
export const deleteCard = createAction(DELETE_CARD, props<{ id: string }>());
