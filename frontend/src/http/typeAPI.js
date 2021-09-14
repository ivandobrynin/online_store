export const getTypes = async() => {
	const baseUrl = 'http://localhost:5000'
	let response = await fetch(`${baseUrl}/api/type`)
	return response
}

export const addNewType = async(type) => {
	const token = localStorage.getItem('token')
	const baseUrl = 'http://localhost:5000'
	let response = await fetch(`${baseUrl}/api/type`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"authorization" : `Bearer ${token}`
		},
		body : JSON.stringify({name: type})
	})
	return response
}
