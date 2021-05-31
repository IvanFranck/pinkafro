const express = require('express');
const router = express.Router();
const serviceProviderController = require('../controllers/serviceProviderController');

router.route("/")
    .get(serviceProviderController.index)
    .post(serviceProviderController.new);

router.route("/:serviceProviderId")
    .patch(serviceProviderController.update)
    .put(serviceProviderController.update)
    .delete(serviceProviderController.delete);

module.exports = router;