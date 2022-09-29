const router = require('express').Router()
const pController = require('../controllers/person_controller')
const Cities = require('../controllers/city_controller')
const { rexCity } = require('../lib/utils/rex')

router.post('/', rexCity, Cities.create)
router.put('/:uuid', rexCity, Cities.update)
router.get('/', pController.cities)
router.get('/:uuid', Cities.getsingle)

module.exports = router;