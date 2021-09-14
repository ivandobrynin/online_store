import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { ListGroup } from 'react-bootstrap'

export const CategoryBar = observer(() => {
	const { device } = useContext(Context)
	return (
			<ListGroup>
				{device.types.map(type =>
					<ListGroup.Item
						active={type.id === device.selectedType.id}
						onClick={() =>	device.setSelectedType(type)}
						style={{cursor: 'pointer'}}
						key={type.id}>{type.name}</ListGroup.Item>
				)}
			</ListGroup>
	)
})