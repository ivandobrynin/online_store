import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Row } from 'react-bootstrap'
import { DeviceCard } from './DeviceCard'
import { Spinner } from '../spinner/Spinner'

export const DeviceList = observer(() => {
	const { device } = useContext(Context)
	if (!device.devices) {
		return <Spinner/>
	}
	return (
		<Row className="d-flex">
			{device.devices.map(device => 
				<DeviceCard key={device.id} device={device}/>
			)}
		</Row>
	)
})
