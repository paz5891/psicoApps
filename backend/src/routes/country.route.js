const router = require('express').Router()
const Country = require('../controllers/country_controller');
const { rexCountry } = require('../lib/utils/rex')

router.post('/', rexCountry, Country.create)
router.put('/:uuid', rexCountry, Country.update)
router.get('/', Country.getall)
router.get('/:uuid', Country.getsingle)

module.exports = router;