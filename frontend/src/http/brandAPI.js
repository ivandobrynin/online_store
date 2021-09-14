export const getBrands = async() => {
	const baseUrl = 'http://localhost:5000'
	let response = await fetch(`${baseUrl}/api/brand`)
	return response
}

export const addNewBrand = async(brand) => {
	const token = localStorage.getItem('token')
	const baseUrl = 'http://localhost:5000'
	let response = await fetch(`${baseUrl}/api/brand`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"authorization" : `Bearer ${token}`
		},
		body : JSON.stringify({name: brand})
	})
	
	return response
}

export const getBrandById = async(id, signal) => {
	const baseUrl = 'http://localhost:5000'
	let response = await fetch(`${baseUrl}/api/brand/${id}`, {
		signal : signal
	})
	return response
}