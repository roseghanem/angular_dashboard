import { UserActions, LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE } from '../state/user.actions';

export interface UserState {
  users: any[];
  error: any;
}

export const initialState: UserState = {
  users: [],
  error: null,
};

export function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
      };
    case LOAD_USERS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
}