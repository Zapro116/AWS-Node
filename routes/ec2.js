const router = require('express').Router();
const { createEc2, pauseEc2, showEc2 } = require('../controller/ec2');

router.get('/', showEc2);

router.post('/', createEc2);

router.post('/pause', pauseEc2);

module.exports = router;
