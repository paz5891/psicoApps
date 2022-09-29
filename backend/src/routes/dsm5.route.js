const router = require('express').Router()
const Dsm = require('../controllers/dsm5_controller');
const { rexDSM } = require('../lib/utils/rex')


router.post('/diagnostic/dsm', rexDSM, Dsm.create);
router.put('/diagnostic/dsm/:uuid', rexDSM, Dsm.update);
router.get('/diagnostic/getall', Dsm.getdsm);
router.get('/diagnostic/singledsm/:uuid', Dsm.getsingle);

module.exports = router;