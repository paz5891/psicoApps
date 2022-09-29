const router = require('express').Router()
const pController = require('../controllers/person_controller')

router.get('/:filename', pController.downloadnAttachmen)

module.exports = router;