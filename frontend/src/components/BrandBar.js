import React, { useContext } from 'react'
import {observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Row, Card } from 'react-bootstrap'

export const BrandBar = observer(() => {
	const { device } = useContext(Context)
	return (
		<Row className="d-flex">
			{device.brands.map(brand => 
				<Card
					border={brand.id === device.selectedBrand.id ? 'primary' : 'none'}
					onClick={() => device.setSelectedBrand(brand)}
					key={brand.id}
					style={{cursor: "pointer", width: '100px', textAlign: 'center'}}
					className="p-1 m-1">
					{brand.name}
				</Card>
			)}
		</Row>
	)
})