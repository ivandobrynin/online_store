import React, { useState, useEffect } from 'react'
import { getDeviceById } from '../http/deviceAPI'
import { SmallSpinner } from '../spinner/SmallSpinner'
import { Col, Row, Image } from 'react-bootstrap'

export const BasketItem = ({deviceId, removeDeviceFromBasket}) => {
	const [device, setDevice] = useState({})

	useEffect(() => {
		getDeviceById(deviceId)
		.then(res => res.json())
		.then(data => setDevice(data))
	}, [])

	const removeDeviceHandler = () => {
		removeDeviceFromBasket(device.id)
	}

	return (
		<Row className="d-flex justify-content-between align-items-center mt-3" style={{height: 100, border: '1px solid blue'}}>
			<Col md={3} style={{padding : 0}}>
				<div width={98} height={98}>
					{device.img ?
						<Image width={98} height={98} src={`${process.env.REACT_APP_API_URL}/${device?.img}`}/>
						: <SmallSpinner/>
					}
				</div>
			</Col>
			<Col md={3}>
				{device?.name}
			</Col>
			<Col md={3}>
				{device?.price}
			</Col>
			<Col md={3} className="d-flex justify-content-end align-items-center">
				<div
					onClick={removeDeviceHandler}
					className="d-flex justify-content-center align-items-center"
					style={{width: 34, height: 34, fontSize: 34, cursor: 'pointer'}}>&times;</div>
			</Col>
		</Row>
	)
}
