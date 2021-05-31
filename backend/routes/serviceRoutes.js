const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.route("/")
    .get(serviceController.index)
    .post(serviceController.new);

router.route("/:serviceId")
    .patch(serviceController.update)
    .put(serviceController.update)
    .get(serviceController.view)
    .delete(serviceController.delete);

module.exports = router