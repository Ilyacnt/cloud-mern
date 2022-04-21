import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from './UI/Input'
import { registration } from '../actions/user'
import { auth } from '../actions/user'

const Registration = () => {
    const dispatch = useDispatch()
    const { isLoading, isError } = useSelector(state => state.user)
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [planTitle, setPlanTitle] = useState('Basic')

    const handlerRegistration = () => {
        dispatch(registration(email, firstName, lastName, password, planTitle))
    }

    if (isLoading) {
        return <>
            ЗАГРУЗКА
        </>
    }


    return (
        <div className="window registration">
            <div className="registration-header">Регистрация</div>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Электронная почта" />
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Имя" />
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Фамилия" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Пароль" />
            <select className="registration-select" value={planTitle} onChange={(e) => setPlanTitle(e.target.value)} >
                <option disabled>Выберите тарифный план</option>
                <option>Basic</option>
                <option>Premium</option>
            </select>
            <button className="btn-default registration-btn" onClick={handlerRegistration}>Зарегистрироваться</button>
        </div>
    )
}

export default Registration