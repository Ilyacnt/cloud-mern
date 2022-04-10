import {SET_FILES, SET_CURRENT_DIR, ADD_FILE, SET_POPUP_DISPLAY, SET_CONTEXT_MENU_DISPLAY, PUSH_TO_DIR_STACK, DELETE_FILE} from '../fileReducer'

export const setFiles = (files) => ({type: SET_FILES, payload: files})
export const setCurrentDir = (dir) => ({type: SET_CURRENT_DIR, payload: dir})
export const addFile = (file) => ({type: ADD_FILE, payload: file})
export const setPopUp = (bool) => ({type: SET_POPUP_DISPLAY, payload: bool})
export const setContextMenu = (context) => ({type: SET_CONTEXT_MENU_DISPLAY, payload: context})
export const pushToDirStack = (dir) => ({type: PUSH_TO_DIR_STACK, payload: dir})
export const deleteFileAction = (dirId) => ({type: DELETE_FILE, payload: dirId})
