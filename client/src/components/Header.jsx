import React from 'react'
import { NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { logoutUser } from '../reducers/action_creators/userActionCreators'

const Header = () => {
	const isAuth = useSelector(state => state.user.isAuth)
	const dispatch = useDispatch()

	return (
		<div className="header">
			<div className="header-container">
				<a href="#" className="header-link"><p className="header-logo">Cloud.<span className="header-logo-span">Хранилище</span></p></a>
				<div className="header-group">
					{!isAuth && <NavLink to="/login"><button className="btn-default">Вход</button></NavLink>}
					{!isAuth && <NavLink to="/registration"><button className="btn-default">Регстрация</button></NavLink>}
					{isAuth && <button className="btn-default" onClick={() => dispatch(logoutUser())}>Выйти</button>}
				</div>
			</div>
		</div>
	)
}

export default Header