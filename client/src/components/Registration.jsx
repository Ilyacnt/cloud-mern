import React, { useState } from 'react'
import Input from './UI/Input'
import {registration} from '../actions/user'

const Registration = () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')


    return (
        <div className="window registration">
            <div className="registration-header">Регистрация</div>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Электронная почта" />
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Имя" />
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Фамилия" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Пароль" />
            <button className="btn-default registration-btn" onClick={() => registration(email, firstName, lastName, password)}>Зарегистрироваться</button>
        </div>
    )
}

export default Registration