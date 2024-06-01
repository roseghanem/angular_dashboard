import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../state/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('userState');

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);