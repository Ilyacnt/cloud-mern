import React, { useEffect } from 'react'
import Header from './components/Header'
import { BrowserRouter, Redirect, Route, Switch, } from 'react-router-dom'
import Registration from './components/Registration'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './actions/user'
import Explorer from './components/exploler/Explorer'

const Layout = () => {
	const isAuth = useSelector(state => state.user.isAuth)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(auth())
	}, [])

	return (
		<BrowserRouter>
			<Header />
			<div className='grayzone'>
				{!isAuth ?
					<Switch>
						<Route path={'/registration'} component={Registration} />
						<Route path={'/login'} component={Login} />
						<Redirect to={'/login'} />
					</Switch>
					:
					<Switch>
						<Route exact path={'/'} component={Explorer} />
						<Redirect to={'/'} />
					</Switch>
				}
			</div>
		</BrowserRouter>
	)
}

export default Layout