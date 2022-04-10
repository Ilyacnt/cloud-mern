export const SET_FILES = 'SET_FILES'
export const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
export const ADD_FILE = 'ADD_FILE'
export const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY'
export const SET_CONTEXT_MENU_DISPLAY = 'SET_CONTEXT_MENU_DISPLAY'
export const PUSH_TO_DIR_STACK = 'PUSH_TO_DIR_STACK'
export const DELETE_FILE = 'DELETE_FILE'


const initialState = {
    files: [],
    currentDir: null,
    popupDisplay: false,
    contextMenu: {},
    dirStack: []
}

export const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILES:
            return {...state, files: action.payload}
        case SET_CURRENT_DIR:
            return {...state, currentDir: action.payload}
        case ADD_FILE:
            return {...state, files: [...state.files, action.payload]}
        case SET_POPUP_DISPLAY:
            return {...state, popupDisplay: action.payload}
        case SET_CONTEXT_MENU_DISPLAY:
            return {...state, contextMenu: action.payload}
        case PUSH_TO_DIR_STACK:
            return {...state, dirStack: [...state.dirStack, action.payload]}
        case DELETE_FILE:
            return {...state, files: [...state.files.filter(file => file._id !== action.payload)]}
    
        default:
            return state
    }
}