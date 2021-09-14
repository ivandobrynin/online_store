import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Switch, Redirect, Route } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { SHOP_ROUTE } from '../utils/constants'
import { Context } from '../index'

export const AppRouter = observer(() => {
	const { user } = useContext(Context)
	console.log('АВТОРИЗОВАН', user.isAuth)
	console.log('ПОЛЬЗОВАТЕЛЬ', user.userRole)


	return (
		<Switch>
			{user.isAuth && authRoutes.map(({path, Component}) => 
				<Route key={path} path={path} component={Component} exact/>
			)}
			{publicRoutes.map(({path, Component}) => 
				<Route key={path} path={path} component={Component} exact/>
			)}
				<Redirect to={SHOP_ROUTE}/>
		</Switch>
	)
})
