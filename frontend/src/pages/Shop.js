import React, { useState, useEffect, useContext } from 'react'
import { CategoryBar } from '../components/CategoryBar'
import { BrandBar } from '../components/BrandBar'
import { DeviceList } from '../components/DeviceList'
import { Col, Container, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { getTypes } from '../http/typeAPI'
import { getBrands } from '../http/brandAPI'
import { getDevices } from '../http/deviceAPI'
import { Spinner } from '../spinner/Spinner'
import { Pages } from '../components/Pages'

export const Shop = observer(() => {
	const { device } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getTypes().then(data => data.json()).then(types => device.setTypes(types))
		getBrands().then(data => data.json()).then(brands => device.setBrands(brands))
		getDevices(null, null, 1, 3).then(data => data.json()).then(devices => {
			device.setDevices(devices.rows)
			device.setTotalCount(devices.count)
			setLoading(false)
		})
	}, [])

	useEffect(() => {
		getDevices(device._selectedType.id, device._selectedBrand.id, device._page).then(data => data.json()).then(devices => {
			device.setDevices(devices.rows)
			device.setTotalCount(devices.count)
			setLoading(false)
		})
	}, [device._page, device._selectedType, device._selectedBrand])

	if (loading) {
		return (
			<Spinner/>
		)
	}

	return (
		<Container>
			<Row className="mt-5">
				<Col md={3} >
					<CategoryBar/>
				</Col>
				<Col md={9}>
					<BrandBar/>
					<DeviceList/>
					<Pages/>
				</Col>
			</Row>
		</Container>
	)
})
