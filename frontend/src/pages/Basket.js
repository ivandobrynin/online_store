import React, { useState, useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { BasketItem } from '../components/BasketItem'
import { getBasketDevices } from '../http/basketAPI'
import { popDevice } from '../http/basketAPI'
import { Context } from '../index'

export const Basket = observer(() => {
	const [devices, setDevices] = useState([])
	const { user } = useContext(Context)
	const { userId } = useParams()
	
	useEffect(() => {
		getBasketDevices(userId)
		.then(response => response.json())
		.then(data => setDevices(data))
	}, [])
	
	const removeDeviceFromBasket = (deviceId) => {
		popDevice(user.userId, deviceId)
		.then(res => res.json())
		.then(data => {
			setDevices(prev => prev.filter(device => device.deviceId !== deviceId))
		})
	}
	
	return (
		<Container className="mt-5">
			{devices.map(device => 
				<BasketItem
					removeDeviceFromBasket={removeDeviceFromBasket}
					key={device.deviceId} 
					deviceId={device.deviceId}/>
			)}
		</Container>
	)
})