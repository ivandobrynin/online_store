import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, NavLink } from 'react-router-dom'
import { Card, Col, Container, Image, Row, Button } from 'react-bootstrap'
import bigStar from '../assets/bigStar.png'
import { getDeviceById, removeDevice } from '../http/deviceAPI'
import { Spinner } from '../spinner/Spinner'
import { LOGIN_ROUTE, SHOP_ROUTE } from '../utils/constants'
import { pushNewDevice, popDevice, getBasketDevices } from '../http/basketAPI'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'

export const DevicePage = observer(() => {
	const [device, setDevice] = useState({info: []})
	const [loading, setLoading] = useState(true)
	const [added, setAdded] = useState(false)
	const { user } = useContext(Context)
	const { id } = useParams()
	const history = useHistory()

	useEffect(() => {
		getDeviceById(id)
		.then(res => res.json())
		.then(data => {
			setDevice(data)
			getBasketDevices(user.userId)
			.then(response => response.json())
			.then(basketData => {
				const isInBasket = basketData.filter(item => item.deviceId === data.id)
				if (isInBasket.length > 0) {
					setAdded(true)
				}
			})
			setLoading(false)
		})
	}, [])

	const addDeviceToBasket = () => {
		pushNewDevice(user.userId, id)
		.then(data => data.json())
		.then(res => {
			if (res.basketDevice) {
				setAdded(true)
			}
		})
	}

	const removeDeviceFromBasket = () => {
		popDevice(user.userId, id)
		.then(data => data.json())
		.then(res => setAdded(false))
	}

	const removeHandler = () => {
		let conf = window.confirm('Вы уверены?')
		if (conf) {
			removeDevice(id).then(res => history.push(SHOP_ROUTE))
		}
	}

	if (loading) {
		return (
			<Spinner/>
		)
	}

	return (

		<Container className="mt-5" >
			<Row>
				<Col md={4} className="d-flex justify-content-center align-items-center">
					<div>
						<Image width={300} height={300} src={`${process.env.REACT_APP_API_URL}/${device.img}`}/>
					</div>
				</Col>
				<Col md={4}  className="d-flex flex-column justify-content-center align-items-center">
					<Row  className="d-flex flex-column justify-content-center align-items-center">
						<h2 style={{textAlign: 'center'}}>{device.name}</h2>
						<div
							style={
								{
									background: `url(${bigStar}) no-repeat center center`, 
									width: "240px", 
									height: "240px",
									backgroundSize: "cover",
									fontSize: 64
								}}
							className="d-flex justify-content-center align-items-center">
							{device.raiting}
						</div>
					</Row>
				</Col>
				<Col md={4} className="d-flex justify-content-center align-items-center">
					<Card 
						className="d-flex flex-column justify-content-around align-items-center"
						style={{width: 300, height: 300, fontSize: 32}}
					>
						
						<h3>Цена от: {device.price}</h3>
						{user.isAuth ?
							<>
							{added ? 
								<>
								<div style={{fontSize: 20}}>
									Товар добавлен в корзину
								</div>
								<Button 
									onClick={removeDeviceFromBasket}
									variant={"outline-dark"}
								>
									Удалить
								</Button>
								</>
								 :
								 <>
								<Button 
									onClick={addDeviceToBasket}
									variant={"outline-dark"} 
								>
									В корзину
								</Button>
								</>
							}
							</>
							:
							<div className="d-flex flex-column align-items-center" style={{fontSize: 18}}>
								<div style={{textAlign: 'center'}}>
									Чтобы добавить товар в корзину, нужно
								</div>
								<NavLink to={LOGIN_ROUTE}>Авторизоваться</NavLink>
							</div>
							
						}

						{user.userRole === 'ADMIN' ? 
							<Button 
								onClick={addDeviceToBasket}
								variant={"outline-danger"}
							>
								Удалить устройство
							</Button>	
							: null
						}
					</Card>
				</Col>
			</Row>
			<Row className="d-flex flex-column mt-5">
				<h3>Характеристики</h3>
				{device.info ? device.info.map((info, index) => 
					<Row 
						style={{background: index % 2 === 0 ? 'lightgrey' : 'transparent', marginLeft: 12}}
						key={info.id}>
						{info.title} : {info.description}
					</Row>) : <Row>
						<h3>Нет информации</h3>
					</Row>
					}
			</Row>
		</Container>
	)
})