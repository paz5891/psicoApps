const router = require('express').Router()
const testType = require('../controllers/testtype_controller');
const { rexTestType } = require('../lib/utils/rex')


router.post('/new', rexTestType, testType.create);
router.put('/:uuid', rexTestType, testType.update);
router.get('/all', testType.gettesttype);
router.get('/:uuid', testType.getsingle);

module.exports = router;