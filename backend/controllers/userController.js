const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket, BasketDevice } = require('../models/models')

const generateToken = (id, email, role) => {
	return token = jwt.sign(
		{id, email, role}, 
		process.env.SECRET_KEY,
		{expiresIn: '24h'}
	)
}

class UserController {
	async registration (req, res, next) {
		const { email, password, role } = req.body

		if (!email && !password) {
			return next(ApiError.badRequest('Некорректные данные'))
		}
		const candidate = await User.findOne({where: {email}})
		if (candidate) {
			return next(ApiError.badRequest('Пользователь уже существует'))
		}
 
		const hashPassword = await bcrypt.hash(password, 5)

		const user = await User.create({email, role, password: hashPassword})
		const basket = await Basket.create({userId: user.id})

		const token = generateToken(user.id, user.email, user.role)
		return res.json({token})
	}

	async login (req, res, next) {
		const { email, password } = req.body
		const user = await User.findOne({where: {email}})

		if (!user) {
			return next(ApiError.badRequest(`Пользователя ${email} не существует`))
		}

		let comparePassword = bcrypt.compareSync(password, user.password)

		if (!comparePassword) {
			return next(ApiError.badRequest(`Неверный пароль`))
		}

		const token = generateToken(user.id, user.email, user.role)
		return res.json({token})
	}

	async checkAuth (req, res, next) {
		const { user } = req.body
		const token = generateToken(user.id, user.email, user.role)
		return res.json({token})
	}
}

module.exports = new UserController()