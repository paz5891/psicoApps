const router = require('express').Router()
const State = require('../controllers/state_controller');
const { rexState } = require('../lib/utils/rex')

router.post('/', rexState, State.create)
router.put('/:uuid', rexState, State.update)
router.get('/', State.getall)
router.get('/:uuid', State.getsingle)

module.exports = router;