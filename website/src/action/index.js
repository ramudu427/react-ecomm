import * as types from './actionTypes';
import $ from "jquery";

export function saveAuthDataToStore(obj) {
    return { type: types.LOGIN_SUCCESS, value: obj };
}