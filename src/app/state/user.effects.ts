import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE, LoadUsers, LoadUsersSuccess, LoadUsersFailure } from '../state/user.actions';

@Injectable()
export class UserEffects {
  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(LOAD_USERS),
    mergeMap((action: LoadUsers) =>
      this.userService.getUsers(action.payload.page).pipe(
        map(response => new LoadUsersSuccess({ users: response.data })),
        catchError(error => of(new LoadUsersFailure({ error })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}