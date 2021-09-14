import React from 'react'
import '../spinner/spinner.css'
import { Container, Row } from 'react-bootstrap'

export const Spinner = () => {
	return (
		<Container>
			<Row className="d-flex justify-content-center">
				<div style={{textAlign: "center", marginTop: 150}}>
					<div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>
			</Row>
		</Container>
	)
}
