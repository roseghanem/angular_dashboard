import { Action } from '@ngrx/store';

export const LOAD_USERS = '[User List] Load Users';
export const LOAD_USERS_SUCCESS = '[User List] Load Users Success';
export const LOAD_USERS_FAILURE = '[User List] Load Users Failure';

export class LoadUsers implements Action {
  readonly type = LOAD_USERS;
  constructor(public payload: { page: number }) {}
}

export class LoadUsersSuccess implements Action {
  readonly type = LOAD_USERS_SUCCESS;
  constructor(public payload: { users: any[] }) {}
}

export class LoadUsersFailure implements Action {
  readonly type = LOAD_USERS_FAILURE;
  constructor(public payload: { error: any }) {}
}

export type UserActions = LoadUsers | LoadUsersSuccess | LoadUsersFailure;