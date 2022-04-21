import axios from 'axios'
import env from "react-dotenv"
import {setUser, setUserIsError, setUserIsLoading} from '../reducers/action_creators/userActionCreators'

export const registration = (email, firstName, lastName, password, planTitle) => {
    return async dispatch => {
        try {
            dispatch(setUserIsError(false))
            dispatch(setUserIsLoading(true))
            const response = await axios.post(env.DB_URL + '/api/auth/registration', {
                email,
                firstName,
                lastName,
                password,
                planTitle
            })
            localStorage.setItem('token', response.data.token)
            dispatch(auth())
        } catch (error) {
            dispatch(setUserIsError(true))
            console.log(error.response.data.message)
        } finally {
            dispatch(setUserIsLoading(false))
        }
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
            console.log('Вход выполнен', response.data.user)
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