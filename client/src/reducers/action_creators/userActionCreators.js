import {SET_USER, LOGOUT, SET_USER_DROPDOWN, SET_IS_LOADING, SET_IS_ERROR} from '../userReducer'

export const setUser = (user) => ({type: SET_USER, payload: user})
export const logoutUser = (user) => ({type: LOGOUT})
export const setUserDropDown = (bool) => ({type: SET_USER_DROPDOWN, payload: bool})
export const setUserIsLoading = (bool) => ({type: SET_IS_LOADING, payload: bool})
export const setUserIsError = (bool) => ({type: SET_IS_ERROR, payload: bool})
