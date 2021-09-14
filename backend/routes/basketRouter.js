const Router = require('express')
const router = new Router()
const basketController = require('../controllers/backetController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',  basketController.pushDevice)
router.post('/remove', basketController.popDevice)
router.get('/:userId', basketController.getBasketDevices)

module.exports = router