import React, { useEffect, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './components/AppRouter'
import { NavBar } from './components/NavBar'
import { observer } from 'mobx-react-lite'
import { Context } from './index'
import { checkAuth } from './http/userAPI'
import jwtDecode from 'jwt-decode'

export const App = observer(() => {
	const { user } = useContext(Context)

	useEffect(() => {
		checkAuth()
		.then(res => res.json())
		.then(data => {
			const token = data.token
			if (token) {
				localStorage.setItem('token', token)
				const decoded = jwtDecode(token)
				user.setUser(decoded)
				user.setIsAuth(true)
				user.setUserRole(decoded.role)
				user.setUserId(decoded.id)
			}
		})
	}, [])

	return (
		<BrowserRouter>
			<NavBar/>
			<AppRouter/>
		</BrowserRouter>
	)
})