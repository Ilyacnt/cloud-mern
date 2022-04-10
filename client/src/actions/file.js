import axios from 'axios'
import env from "react-dotenv"
import { setFiles, addFile, deleteFileAction } from '../reducers/action_creators/filesActionCreators'
import { addUploadFile, showUploader, changeUploadFile } from '../reducers/action_creators/uploadActionCreators'

export const getFiles = (dirId) => {
    return async dispatch => {
        try {
            const response = await axios.get(env.DB_URL + `/api/files${dirId ? '?parent=' + dirId : ''}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(response.data))
            console.log(response.data)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
}


export const createDir = (dirId, name) => {
    return async dispatch => {
        try {
            const response = await axios.post(env.DB_URL + `/api/files`, {
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(addFile(response.data))
            console.log(response.data)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
}


export const uploadFile = (file, dirId) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)

            if (dirId) {
                formData.append('parent', dirId)
            }

            const uploadFile = {id: Date.now(), name: file.name, progress: 0}
            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))

            const response = await axios.post(env.DB_URL + `/api/files/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length')
                    console.log('total', totalLength)

                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploadFile(uploadFile))
                    }
                }
            })
            dispatch(addFile(response.data))

        } catch (error) {
            console.log(error)
        }
    }
}


export const downloadFile = async (file) => {
    try {
        const response = await fetch(env.DB_URL + `/api/files/download?id=${file._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status === 200) {
            const blob = await response.blob()
            const downloadUrl = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = file.name
            document.body.appendChild(link)
            link.click()
            link.remove()

        }


    } catch (error) {
        console.log(error)
    }
}


export const deleteFile = (file) => {
    return async dispatch => {
        try {
            const response = axios.delete(env.DB_URL + `/api/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(file._id))

        } catch (error) {
            console.log(error)
        }
    }
}