const { Basket, BasketDevice } = require('../models/models')
const ApiError = require('../error/ApiError')


class BasketController {
	async pushDevice (req, res) {
		const { userId, deviceId } = req.body
		const basket = await Basket.findOne({where: {userId}})
		const basketId = basket.id
		const basketDevice = await BasketDevice.create({basketId, deviceId})
		return res.json({basketDevice})
	}

	async popDevice (req, res) {
		const { userId, deviceId } = req.body
		const basket = await Basket.findOne({where: {userId}})
		const basketId = basket.id
		const response = await BasketDevice.destroy({where: {basketId, deviceId}})
		if (response === 1) {
			return res.json({message: "Успешное удаление"})
		}
		return res.json({message: "Ошибка при удалении"})
	}

	async getBasketDevices (req, res) {
		const { userId } = req.params
		const basket = await Basket.findOne({where: {userId}})
		const basketId = basket.id
		const devices = await BasketDevice.findAll({where: {basketId}})
		return res.json(devices)
	}
}

module.exports = new BasketController()