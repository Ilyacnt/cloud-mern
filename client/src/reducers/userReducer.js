export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'
export const SET_USER_DROPDOWN = 'SET_USER_DROPDOWN'


const initialState = {
    currentUser: {},
    isAuth: false,
    showUserDropdown: false
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
            
   
        default:
            return state
    }
}