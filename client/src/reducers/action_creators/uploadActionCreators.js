import {
    SHOW_UPLOADER,
    HIDE_UPLOADER,
    ADD_UPLOAD_FILE,
    REMOVE_UPLOAD_FILE,
    CHANGE_UPLOAD_FILE
} from '../uploadReducer'


export const showUploader = () => ({type: SHOW_UPLOADER})
export const hideUploader = () => ({type: HIDE_UPLOADER})
export const addUploadFile = (file) => ({type: ADD_UPLOAD_FILE, payload: file})
export const removeUploadFile = (file) => ({type: REMOVE_UPLOAD_FILE, payload: file.id})
export const changeUploadFile = (file) => ({type: CHANGE_UPLOAD_FILE, payload: {id: file.id, progress: file.progress}})