import axios from 'axios'
import env from "react-dotenv"
import {setUser} from '../reducers/action_creators/userActionCreators'

export const registration = async (email, password) => {
    try {
        const response = await axios.post(env.DB_URL + '/api/auth/registration', {
            email,
            password
        })
        .then(response => console.log(response.data.message))
    } catch (error) {
        console.log(error.response.data.message)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(env.DB_URL + '/api/auth/login', {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            console.log('Вход выполнен')
        } catch (error) {
            console.log(error)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(env.DB_URL + '/api/auth/auth', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (error) {
            console.log(error)
            localStorage.removeItem('token')
        }
    }
}

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(env.DB_URL + '/api/files/avatar', formData, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
            dispatch(setUser(response.data.user))
        } catch (error) {
            console.log(error)
            localStorage.removeItem('token')
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await axios.delete(env.DB_URL + '/api/files/avatar', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
            dispatch(setUser(response.data.user))
        } catch (error) {
            console.log(error)
            localStorage.removeItem('token')
        }
    }
}