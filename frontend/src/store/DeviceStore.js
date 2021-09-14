import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
	constructor() {
		this._types = []
		this._brands = []
		this._devices = []
		this._user = {}
		this._selectedType = {}
		this._selectedBrand = {}
		this._page = 1
		this._totalCount = 0
		this._limit = 8
		makeAutoObservable(this)
	}

	setTypes(types) {
		this._types = types
	}

	setBrands(brands) {
		this._brands = brands
	}

	setDevices(devices) {
		this._devices = devices
	}

	setSelectedType(type) {
		this.setPage(1)
		this._selectedType = type
	}

	setSelectedBrand(brand) {
		this.setPage(1)
		this._selectedBrand = brand
	}

	setPage(n) {
		this._page = n
	}
	
	setTotalCount(n) {
		this._totalCount = n
	}
	
	setLimit(n) {
		this._limit = n
	}

	get types() {
		return this._types
	}

	get brands() {
		return this._brands
	}

	get devices() {
		return this._devices
	}

	get selectedType() {
		return this._selectedType
	}

	get selectedBrand() {
		return this._selectedBrand
	}

	get page() {
		return this._page
	}

	get totalPages() {
		return this._totalPages
	}

	get limit() {
		return this._limit
	}
	
}