import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { addNewBrand } from '../http/brandAPI'

export const AddBrand = ({ show, closeHandler }) => {
	const [brand, setBrand] = useState('')
	const [error, setError] = useState('')

	const addBrand = () => {
		addNewBrand(brand).then(res => {
			if (res.ok) {
				closeHandler()
			} else {
				window.alert('НЕТ ДОСТУПА')
			}
		})
		.finally(setBrand(''))
	}

	return (
		<>
			<Modal
				show={show}
				onHide={closeHandler}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton onClick={closeHandler}>
					<Modal.Title>Добавить брэнд</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Control
							onChange={(e) => setBrand(e.target.value)}
							value={brand}
							placeholder="Введите название брэнда"
						/>
					</Form>
				</Modal.Body>
				<Modal.Footer className="d-flex flex-column justify-content-center">
					<Button
						onClick={addBrand}
						variant="outline-primary"
					>
						Добавить
					</Button>
					<div style={{color: 'red'}}>
						{error}
					</div>
				</Modal.Footer>
			</Modal>
		</>
	)
}
