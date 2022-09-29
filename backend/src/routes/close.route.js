const router = require('express').Router()

const CloseStage = require('../controllers/close_controller')
const { rexClose } = require('../lib/utils/rex')

router.route('/close/:uuid')
    .post(rexClose, CloseStage.create)
    .put(rexClose, CloseStage.update)
    .get(CloseStage.get)

module.exports = router;