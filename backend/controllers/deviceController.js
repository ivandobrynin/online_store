const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
	async create (req, res, next) {
		try {
			let { name, price, brandId, typeId, info} = req.body
			const { img } = req.files
			if (!name || !price || !brandId || !typeId || !img) {
				next(ApiError.badRequest('Заполните все поля'))
			}
			let fileName = uuid.v4() + '.jpg'
			img.mv(path.resolve(__dirname, '..', 'static', fileName))
			const device = await Device.create({name, price, brandId, typeId, img: fileName})
			if (info) {
				const information = JSON.parse(info)
				information.forEach(i => {
					DeviceInfo.create({
						title: i.title,
						description: i.description,
						deviceId: device.id
					})
				})
			}
			return res.json({device})
		}	catch(e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async getAll (req, res, next) {
		try {
			const { data } = req.params
			const params = data.split(',')
			let brandId = params[0]
			let typeId = params[1]
			let page = params[2]
			let limit = params[3]
			console.log(typeId, brandId, page, limit)
			page = page || 1
			limit = limit || 8
			let offset = page * limit - limit
			let devices
			if (!brandId && !typeId) {
				devices = await Device.findAndCountAll({limit, offset})
		}
			if (brandId && !typeId) {
					devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
			}
			if (!brandId && typeId) {
					devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
			}
			if (brandId && typeId) {
					devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
			}

			return res.json(devices)
		} catch(e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async getOne (req, res) {
		const { id } = req.params
		const device = await Device.findOne(
			{
				where: {id},
				include: [{model: DeviceInfo, as: 'info'}]
			}
		)
		return res.json(device)
	}

	async remove (req, res, next) {
		try {
			let { id } = req.body
			const response = await Device.destroy({where: {id}})
			if (response === 1) {
				return res.json({message: "Успешное удаление"})
			}
			return res.json({message: "Ошибка при удалении"})
		}	catch(e) {
			next(ApiError.badRequest(e.message))
		}
	}
}

module.exports = new DeviceController()