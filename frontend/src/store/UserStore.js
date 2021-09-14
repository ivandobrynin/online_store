import { makeAutoObservable } from 'mobx'

export default class UserStore {
	constructor() {
		this._isAuth = false
		this._user = {}
		this._userRole = 'USER'
		this._userId = null
		makeAutoObservable(this)
	}

	setIsAuth(boolean) {
		this._isAuth = boolean
	}
	setUser(user) {
		this._user = user
	}

	setUserRole(role) {
		this._userRole = role
	}

	setUserId(id) {
		this._userId = id
	}

	get isAuth() {
		return this._isAuth
	}

	get user() {
		return this._user
	}

	get userRole() {
		return this._userRole
	}
	
	get userId ()  {
		return this._userId
	}
}