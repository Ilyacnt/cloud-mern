export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'
export const SET_USER_DROPDOWN = 'SET_USER_DROPDOWN'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_IS_ERROR = 'SET_IS_ERROR'


const initialState = {
    currentUser: {},
    isAuth: false,
    showUserDropdown: false,
    isLoading: false,
    isError: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, currentUser: action.payload, isAuth: true}
        case LOGOUT:
            localStorage.removeItem('token')
            return {...state, currentUser: {}, isAuth: false}
        case SET_USER_DROPDOWN:
            return {...state, showUserDropdown: action.payload}
        case SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        case SET_IS_ERROR:
            return {...state, isError: action.payload}
        default:
            return state
    }
}