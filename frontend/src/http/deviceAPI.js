export const getDevices = async(typeId, brandId, page, limit) => {
	const baseUrl = 'http://localhost:5000'
	const params = [typeId, brandId, page, limit]
	let response = await fetch(`${baseUrl}/api/device/filter/${params}`)
	return response
}

export const getDeviceById = async(id) => {
	const baseUrl = 'http://localhost:5000'
	let response = await fetch(`${baseUrl}/api/device/${id}`)
	return response
}

export const addNewDevice = async(device) => {
	const token = localStorage.getItem('token')
	const baseUrl = 'http://localhost:5000'
	let response = await fetch(`${baseUrl}/api/device`, {
		method: "POST",
		headers: {
			"authorization" : `Bearer ${token}`
		},
		body : device
	})
	return response.json()
}

export const removeDevice = async(id) => {
	const token = localStorage.getItem('token')
	const baseUrl = 'http://localhost:5000'
	let response = await fetch(`${baseUrl}/api/device/remove`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"authorization" : `Bearer ${token}`
		},
		body : JSON.stringify({id})
	})
	return response
}
