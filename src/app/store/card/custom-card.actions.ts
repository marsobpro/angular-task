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

export const CREATE_CARDS = '[Custom Card] Create Cards';

export const DELETE_CARD = '[Custom Card] Delete Card';
export const GET_VIDEOS = '[Custom Card] Get Videos';
export const GET_VIDEOS_SUCCESS = '[Custom Card] Get Videos Success';
export const GET_VIDEOS_ERROR = '[Custom Card] Get Videos Error';

export const TEST = '[Custom Card] TEST';

export const loadCards = createAction(LOAD_CARDS);
export const loadCardsSuccess = createAction(
  LOAD_CARDS_SUCCESS,
  props<{ cards: any[] }>()
);

//Creating card
export const createCard = createAction(CREATE_CARD, props<{ card: any }>());

export const createCards = createAction(
  CREATE_CARDS,
  props<{ cards: any[] }>()
);

//Deleting card
export const deleteCard = createAction(DELETE_CARD, props<{ id: string }>());

export const getVideos = createAction(
  GET_VIDEOS,
  props<{ searchQuery: string }>()
);

export const getVideosSuccess = createAction(
  GET_VIDEOS_SUCCESS,
  props<{ data: any }>()
);

export const getVideosError = createAction(GET_VIDEOS_ERROR);
