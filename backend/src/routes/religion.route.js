const router = require('express').Router();
const religion = require('../controllers/religion_controller')
const { rexDSM } = require('../lib/utils/rex')

router.post('/', rexDSM, religion.create)
router.put('/:uuid', rexDSM, religion.update)
router.get('/', religion.getall)
router.get('/:uuid', religion.getsingle)

module.exports = router;