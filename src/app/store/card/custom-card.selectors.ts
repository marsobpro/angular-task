import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCardState = createFeatureSelector<any>('cards');

export const selectAllCards = createSelector(selectCardState, (state) => [
  ...state.customCards,
  ...state.apiCards,
]);
export const selectCustomCards = createSelector(selectCardState, (state) => [
  ...state.customCards,
]);
