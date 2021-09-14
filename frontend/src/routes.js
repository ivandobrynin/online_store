import  { Admin }  from '../src/pages/Admin'
import  { Basket }  from '../src/pages/Basket'
import  { Shop } from '../src/pages/Shop'
import  { Auth } from '../src/pages/Auth'
import  { DevicePage }  from '../src/pages/DevicePage'
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, BASKET_ROUTE, DEVICE_ROUTE } from './utils/constants'


export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: Admin
	},
	{
		path: BASKET_ROUTE + '/:userId',
		Component: Basket
	}
]

export const publicRoutes = [
	{
		path: REGISTRATION_ROUTE,
		Component: Auth
	},
	{
		path: LOGIN_ROUTE,
		Component: Auth
	},
	{
		path: SHOP_ROUTE,
		Component: Shop
	},
	{
		path: DEVICE_ROUTE + "/:id",
		Component: DevicePage
	}
]