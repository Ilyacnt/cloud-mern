import {SET_USER, LOGOUT} from '../userReducer'

export const setUser = (user) => ({type: SET_USER, payload: user})
export const logoutUser = (user) => ({type: LOGOUT})