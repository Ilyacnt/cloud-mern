import {SET_USER, LOGOUT, SET_USER_DROPDOWN} from '../userReducer'

export const setUser = (user) => ({type: SET_USER, payload: user})
export const logoutUser = (user) => ({type: LOGOUT})
export const setUserDropDown = (bool) => ({type: SET_USER_DROPDOWN, payload: bool})