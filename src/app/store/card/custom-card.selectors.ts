import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCardState = createFeatureSelector<any>('cards');

export const selectAllCards = createSelector(
  selectCardState,
  (state) => state.cards
);
