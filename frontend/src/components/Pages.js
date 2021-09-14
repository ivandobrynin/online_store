import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Pagination } from 'react-bootstrap'

export const Pages = observer(() => {
	const { device } = useContext(Context)
	const pagesCount = Math.ceil(device._totalCount / device._limit)
	const pages = []

	for (let i = 0; i < pagesCount; i++) {
		pages.push(i + 1)
	}
	
	return (
		<div className="d-flex justify-content-center">
			<Pagination className="mt-5">
				{pages.map(page => {
					return (
						<Pagination.Item
							key={page}
							active={device._page === page}
							onClick={() => device.setPage(page)}
						>
							{page}
						</Pagination.Item>
					)
				})}
			</Pagination>
		</div>
	)
})
