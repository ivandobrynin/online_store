import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { Context } from '../index'
import { Navbar, Nav, Button, Container, Image } from 'react-bootstrap'
import { ADMIN_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, BASKET_ROUTE } from '../utils/constants'
import { useHistory } from 'react-router-dom'
import cart_img from '../icons/cart.png'

export const NavBar = observer(() => {
	const { user } = useContext(Context)
	const history = useHistory()

	const closeHandler = () => {
		localStorage.removeItem('token')
		user.setUser({})
		user.setIsAuth(false)
	}

	return (
		<Navbar expand="lg" style={{borderBottom: '1px solid #0275d8'}}>
			<Container>
				<Navbar.Brand>
					<Link style={{textDecoration: "none", color: "#0275d8", fontSize: 32}} to={SHOP_ROUTE}>STORE</Link>
				</Navbar.Brand>
				<Nav style={{marginLeft: "auto"}}>
				{ user.isAuth?
					<>
						{ 
							user.userRole === 'ADMIN' ? 
								<Button
								onClick={() => history.push(ADMIN_ROUTE)}
								variant="outline-primary" 
								style={{marginRight: "20px"}}
							>
								Админ
							</Button>
							: null
						}
						<div className="d-flex">
							<div
								onClick={() => history.push(BASKET_ROUTE + "/" + user.userId)}
								style={{marginRight: 30, color: 'red'}}>
								<Image src={cart_img} style={{width: 45, height: 45}}/>
							</div>
							<Button 
								onClick={closeHandler}
								variant="outline-primary"
							>
								Выйти
							</Button>
						</div>
					</> 
					:
					<Button 
						variant="outline-primary" 
						onClick={() => history.push(LOGIN_ROUTE)}
					>
						Авторизация
					</Button>
				}
				</Nav>
			</Container>
		</Navbar>
	)
})
