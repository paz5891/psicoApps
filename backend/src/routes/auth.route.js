const router = require('express').Router()
const RouterUser = require('../controllers/user.controller')

router.post('/auth/google', RouterUser.OAuthWithGoogle)

module.exports = router;