const Router = require('express')
const router = new Router()
const authService = require('./authService')

router.post('/registration', authService.registration)
router.post('/login', authService.login)
router.post('/logout')

module.exports = router