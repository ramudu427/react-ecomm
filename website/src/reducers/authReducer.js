import {LOGIN_SUCCESS} from '../actions/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return action.value;
    }
    default:
      return state;
  }
}
