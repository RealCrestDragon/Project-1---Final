const express = require('express');
const router = express.Router();
const stepController = require('../app/controllers/StepController');

router.post('/add', stepController.createStep);
router.get('/get_by_id/:id', stepController.showDetail);
router.post('/delete', stepController.deleteStep);
router.put('/find', stepController.findStep);

module.exports = router;
