import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { AddBrand } from '../modals/AddBrand'
import { AddCategory } from '../modals/AddCategory'
import { AddDevice } from '../modals/AddDevice'

export const Admin = () => {
	const [showBrand, setShowBrand] = useState(false)
	const [showCategory, setShowCategory] = useState(false)
	const [showDevice, setShowDevice] = useState(false)
	
	return (
		<>
			<Container className="d-flex flex-column">
				<Button
					onClick={() => setShowBrand(true)}
					variant="outline-primary"
					className="mt-4 p-2"
				>
					Добавить брэнд
				</Button>

				<Button
					onClick={() => setShowCategory(true)}
					variant="outline-primary"
					className="mt-4 p-2"
				>
					Добавить категрию
				</Button>

				<Button
					onClick={() => setShowDevice(true)}
					variant="outline-primary"
					className="mt-4 p-2"
				>
					Добавить устройство
				</Button>
			</Container>
			
			<AddBrand show={showBrand} closeHandler={() => setShowBrand(false)}/>
			<AddCategory show={showCategory} closeHandler={() => setShowCategory(false)}/>
			<AddDevice show={showDevice} closeHandler={() => setShowDevice(false)}/>
		</>
	)
}
