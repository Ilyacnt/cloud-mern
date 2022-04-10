import React, { useState } from 'react'
import Input from './UI/Input'
import {login} from '../actions/user'
import {useDispatch} from 'react-redux'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()


    return (
        <div className="window registration">
            <div className="registration-header">Авторизация</div>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Электронная почта" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Пароль" />
            <button className="btn-default registration-btn" onClick={() => dispatch(login(email, password))}>Войти</button>
        </div>
    )
}

export default Login