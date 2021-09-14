import React, { useState, useContext } from 'react'
import { Container, Form, Card, Button, Row, FloatingLabel } from 'react-bootstrap'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { registration, login } from '../http/userAPI'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/constants'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import jwtDecode from 'jwt-decode'


export const Auth = observer(() => {

	const { user } = useContext(Context)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)
	const location = useLocation()
	const history = useHistory()
	const isLogin = location.pathname === LOGIN_ROUTE

	const emailHandler = (e) => {
		setError('')
		setEmail(e.target.value)
	}
	
	const passwordHandler = (e) => {
		setError('')
		setPassword(e.target.value)
	}

	const click = async () => {
		let response
		if (isLogin) {
			response = await login(email, password)
		} else {
			response = await registration(email, password)
		}

		if (response.ok) {
			response = await response.json()
			const token = response.token
			localStorage.setItem('token', token)
			const data = jwtDecode(token)
			console.log('AUTH DATA', data)
			user.setUser(data)
			user.setIsAuth(true)
			user.setUserRole(data.role)
			user.setUserId(data.id)
			history.push(SHOP_ROUTE)
		} else {
			response = await response.json()
			setError(response.message)
		}
	}

	const keyPressHandler = (e) => {
		if (e.code === 'Enter') {
			click()
		}
	}

	return (
		<Container 
			className="d-flex justify-content-center align-items-center"
			style={{height: window.innerHeight - 54}}
		>
			<Card 
				onKeyPress={keyPressHandler}
				style={{width: 600}} className="p-5">
				<h4 className="m-auto mb-3">{isLogin ? "Авторизация" : "Регистрация"}</h4>
				<Form className="d-flex flex-column">
					<FloatingLabel controlId="floatingPassword" label="Email">
						<Form.Control
						onChange={(e) => emailHandler(e)}
							value={email}
							className="mb-3"
							placeholder="Введите email..."
						/>
					</FloatingLabel>
					<FloatingLabel controlId="floatingPassword" label="Password">
						<Form.Control
							onChange={(e) => passwordHandler(e)}
							value={password}
							type="password"
							className="mb-3"
							placeholder="Введите пароль..."
						/>
					</FloatingLabel>
					<Button 
						onClick={click}
						className="mt-3" 
						variant="outline-primary"
					>
						{isLogin ? "Вход" : "Регистрация"}
					</Button>
					{
						isLogin ? 
						<Row>
							<div className="d-flex mt-3 justify-content-center">
								<div style={{marginRight: '7px'}}>
									Если у вас еще нет аккаунта, вы можете
								</div>
								<NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
							</div>
						</Row>
						: 
						<Row>
							<div className="d-flex mt-3 justify-content-center">
								<div style={{marginRight: '7px'}}>
									Есть аккаунт?
								</div>
								<NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
							</div>
						</Row>
					}
				</Form>
				<div 
					style={{color: '#DA3815'}}
					className="d-flex mt-3 justify-content-center">
					{error}
				</div> 
			</Card>

		</Container>
	)
})
