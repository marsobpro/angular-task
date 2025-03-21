import { createReducer, on } from '@ngrx/store';
import { setPage } from './pagination.actions';

export interface PaginationState {
  currentPage: number;
  pageToken: string | null;
}

const initialState: PaginationState = {
  currentPage: 1,
  pageToken: null,
};

export const paginationReducer = createReducer(
  initialState,
  on(setPage, (state, { page, pageToken }) => ({
    currentPage: page,
    pageToken: pageToken,
  }))
);

export const selectPaginationState = (state: any) => state.pagination;
