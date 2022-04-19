import React, { useEffect } from 'react'
import env from "react-dotenv"
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, setUserDropDown } from '../reducers/action_creators/userActionCreators'
import { ReactComponent as ArrowDownSVG } from '../assets/chevron-down-sharp.svg'
import AvatarPlaceholderIMG from '../assets/avatar-placeholder.png'

const Header = () => {
	const showUserDropdown = useSelector(state => state.user.showUserDropdown)
	const isAuth = useSelector(state => state.user.isAuth)
	const currentUser = useSelector(state => state.user.currentUser)
	const dispatch = useDispatch()


	useEffect(() => {
		const handleUserDropdownClick = () => { dispatch(setUserDropDown(false)) }
		window.addEventListener('click', handleUserDropdownClick)
		return () => window.removeEventListener('click', handleUserDropdownClick)
	}, [])

	const dropDownHandler = e => {
		e.stopPropagation()
		dispatch(setUserDropDown(!showUserDropdown))
	}

	return (
		<div className="header">
			<div className="header-container">
				<NavLink to="/" className="header-link">
					<p className="header-logo">Cloud.
						<span className="header-logo-span">
							Хранилище
						</span>
						{currentUser.planTitle === 'Premium' && (<span className='header-logo-premium'> PREMIUM</span>)}
					</p>
				</NavLink>
				<div className="header-group">
					{!isAuth &&
						<>
							<NavLink to="/login"><button className="btn-default">Вход</button></NavLink>
							<NavLink to="/registration"><button className="btn-default">Регстрация</button></NavLink>
						</>

					}
					{isAuth &&
						<div className="header-user" onClick={dropDownHandler}>
							<ArrowDownSVG className="header-user-arrow" />
							<p>{currentUser.email}</p>
							<img src={currentUser.avatarUrl ? `${env.DB_URL}/${currentUser.avatarUrl}` : AvatarPlaceholderIMG} alt='user avatar' />
							{showUserDropdown && <div className="header-user-dropdown">
								<NavLink to='/profile' ><button className="btn-default">Аккаунт</button></NavLink>
								<button className="btn-default btn-logout" onClick={() => dispatch(logoutUser())}>Выйти</button>
							</div>}
						</div>
					}
				</div>
			</div>
		</div>
	)
}

export default Header