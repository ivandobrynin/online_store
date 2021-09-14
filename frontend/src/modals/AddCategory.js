import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { addNewType } from '../http/typeAPI'

export const AddCategory = ({ show, closeHandler }) => {
	const [type, setType] = useState('')

	const addCategory = () => {
		addNewType(type).then(res => {
			if (res.ok) {
				closeHandler()
			} else {
				window.alert('НЕТ ДОСТУПА')
				closeHandler()
			}
		})
		.finally(setType(''))
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
					<Modal.Title>Добавить категорию</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Control
							onChange={(e) => setType(e.target.value)}
							value={type}
							placeholder="Введите название категории"
						/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={addCategory}
						variant="outline-primary">Добавить</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
