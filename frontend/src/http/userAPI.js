export const registration = async(email, password) => {
	const baseUrl = 'http://localhost:5000'
	let response = await fetch(`${baseUrl}/api/user/registration`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email, password
		})
	})
	return response
}

export const login = async(email, password) => {
	const baseUrl = 'http://localhost:5000'
	let response = await fetch(`${baseUrl}/api/user/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email, password
		})
	})
	return response
}

export const checkAuth = async() => {
	const token = localStorage.getItem('token')
	const baseUrl = 'http://localhost:5000'
	let response = await fetch(`${baseUrl}/api/user/auth`, {
		headers: {
			"Content-Type" : "application/json",
			"authorization" : `Bearer ${token}`
		}
	})
	return response
}
