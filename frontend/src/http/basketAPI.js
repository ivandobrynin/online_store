export const pushNewDevice = async(userId, deviceId) => {
	const baseUrl = 'http://localhost:5000'
	let response = await fetch(`${baseUrl}/api/basket`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body : JSON.stringify({userId, deviceId})
	})
	
	return response
}

export const popDevice = async(userId, deviceId) => {
	const baseUrl = 'http://localhost:5000'
	let response = await fetch(`${baseUrl}/api/basket/remove`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body : JSON.stringify({userId, deviceId})
	})
	return response
}

export const getBasketDevices = async(userId) => {
	const baseUrl = 'http://localhost:5000'
	let response = await fetch(`${baseUrl}/api/basket/${userId}`)
	return response
}
