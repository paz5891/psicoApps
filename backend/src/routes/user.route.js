const router = require('express').Router()
const CRUDcase = require('../controllers/case_controller')
const RouterUser = require('../controllers/user.controller')
const authMiddAmdin = require('../middlewares/middle.admin')
const auth = require('../middlewares/auth')

router.get('/:active/:retired', auth.Auth, authMiddAmdin.Admin, CRUDcase.getpersonuser)
router.put('/', auth.Auth, authMiddAmdin.Admin, RouterUser.activeAccount)
router.delete('/', auth.Auth, authMiddAmdin.Admin, RouterUser.deleteUser)

module.exports = router;