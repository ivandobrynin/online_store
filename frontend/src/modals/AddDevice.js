import React, { useState, useEffect, useContext } from 'react'
import { Button, Dropdown, Row, Form, Modal, Col } from 'react-bootstrap'
import { getTypes } from '../http/typeAPI'
import { getBrands } from '../http/brandAPI'
import { addNewDevice } from '../http/deviceAPI'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'

export const AddDevice = observer(({ show, closeHandler }) => {

	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [file, setFile] = useState(null)
	const [info, setInfo] = useState([])
	const [error, setError] = useState('')
	const { device } = useContext(Context)

	useEffect(() => {
		getTypes().then(data => data.json()).then(types => device.setTypes(types))
		getBrands().then(data => data.json()).then(brands => device.setBrands(brands))
		device.setSelectedType({})
		device.setSelectedBrand({})
	}, [])

	const selectFile = (e) => {
		setFile(e.target.files[0])
	}

	const addInfo = () => {
		setInfo([...info, {title: '', description: '', number: Date.now()}])
	}

	const removeInfo = (num) => {
		setInfo(info.filter((item) => item.number !== num))
	}

	const changeInfo = (key, value, number) => {
		setInfo(info.map(item => {
			if (item.number === number) {
				return {...item, [key]: value}
			} else {
				return item
			}
		}))
	}

	const addDevice = () => {
		const formData = new FormData()
		formData.append("name", name)
		formData.append("price", price.toString())
		formData.append("img", file)
		formData.append("brandId", device._selectedBrand.id)
		formData.append("typeId", device._selectedType.id)
		formData.append("info", JSON.stringify(info))
		addNewDevice(formData).then(res => {
			if (res.device) {
				device.setSelectedType({})
				device.setSelectedBrand({})
				setName('')
				setPrice('')
				setFile(null)
				setInfo([])
				setError('')
				closeHandler()
			}
			if (res.message) {
				setError(res.message)
			}
		})
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
					<Modal.Title>Добавить устройство</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row className="d-flex justify-content-around">
						<Dropdown style={{width: 160, padding: 0}}>
							<Dropdown.Toggle style={{width: 160}}>
								{device._selectedType.name || "Категория"}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								{device._types.map(type => 
									<Dropdown.Item
											onClick={() => device.setSelectedType(type)}
											key={type.id}
										>
											{type.name}
										</Dropdown.Item>
								)}
							</Dropdown.Menu>
						</Dropdown>
						<Dropdown style={{width: 160, padding: 0}}>
							<Dropdown.Toggle style={{width: 160}}>
								{device._selectedBrand.name || 'Брэнд'}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								{device._brands.map(brand => 
									<Dropdown.Item
										onClick={() => device.setSelectedBrand(brand)}
										key={brand.id}
									>
										{brand.name}
									</Dropdown.Item>	
								)}
							</Dropdown.Menu>
						</Dropdown>
					</Row>
					<Form.Control
						onChange={(e) => setName(e.target.value)}
						value={name}
						className="mt-3"
						placeholder="Название"
					/>
					<Form.Control
						onChange={(e) => setPrice(Number(e.target.value))}
						value={price}
						type="number"
						className="mt-3"
						placeholder="Цена"
					/>
					<Form.Control
						onChange={selectFile}
						type="file"
						className="mt-3"
					/>
					<Row className="d-flex justify-content-center">
						<Col md={6} className="d-flex justify-content-center">
							<Button
								onClick={addInfo}
								className="mt-3"
								variant="outline-primary"
							>
								Добавить свойство
							</Button>
						</Col>
						{
							info.map(item => 
								<Row
									key={item.number}
									className="mt-2">
									<Col md={4}>
										<Form.Control
											onChange={(e) => changeInfo('title', e.target.value, item.number)}
											value={item.title}
											placeholder="Свойство"
										/>
									</Col>
									<Col md={4}>
										<Form.Control
											onChange={(e) => changeInfo('description', e.target.value, item.number)}
											value={item.description}
											placeholder="Значение"
										/>
									</Col>
									<Col md={4} className="d-flex justify-content-center">
										<Button
											onClick={() => removeInfo(item.number)}
											variant="outline-danger" 
											style={{width: "100%"}}
										>
											Удалить
										</Button>
									</Col>
								</Row>
							)
						}
					</Row>
				</Modal.Body>
				<Modal.Footer className="d-flex flex-column justify-content-center">
						<Button 
							onClick={addDevice}
							type="submit"
							variant="primary"
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
})