import React, { useState, useEffect } from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import star from '../assets/star.png'
import { useHistory } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/constants'
import { getBrandById } from '../http/brandAPI'

export const DeviceCard = ({device}) => {
	const [brandName, setBrandName] = useState('')

	useEffect(() => {
		getBrandById(device.typeId)
		.then(res => res.json())
		.then(data => {
			setBrandName(data.name)
		})
	}, [])


	const history = useHistory()
	return (
		<Col md={3} className="mt-5" onClick={() => history.push(DEVICE_ROUTE + "/" + device.id)}>
			<Card style={{width: '200px', cursor: 'pointer'}} border={"none"}>
				<Image width={198} height={198} src={`${process.env.REACT_APP_API_URL}/${device.img}`}/>
				<div className="d-flex justify-content-between align-items-center p-1">
					<div style={{color: 'grey'}}>{brandName}</div>
					<div className="d-flex align-items-center">
						{device.raiting}
						<Image width={20} height={20} src={star}/>
					</div>
				</div>
				<div className="p-1">{device.name}</div>
			</Card>
		</Col>
	)
}
