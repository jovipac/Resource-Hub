import { AuthActions, AuthActionTypes } from '../actions/auth';
import { Credential } from '../models/credential';

export interface State {
  loggedIn: boolean;
  credential: Credential | null;
}

export const initialState: State = {
  loggedIn: false,
  credential: null
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
        credential: action.payload.credential
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.credential;
