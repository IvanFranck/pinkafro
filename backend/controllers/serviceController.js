// iport service model
const Service = require('../models/serviceModel');

//get all services 
exports.index = async (req, res) => {
    await Service.get( (err, services) => {
        if (err) 
            res.status(404).json({
                error: err
            });
        res.status(200).json({
            message: "services retrieved successfully",
            data: services
        });
    });
};

//hadle service getting
exports.view = async (req, res) => {
    await Service.findById(req.params.serviceId, (err, service) => {
        if (err) res.status(404).json(err);
        res.status(200).json({
            message: "service details loading...",
            data: service
        });
    });
};


//handle service add action
exports.new = async (req, res) => {
    var service = new Service();
    service.name = req.body.name;
    await service.save( err => {
        if(err) res.status(400).json(err);

        res.status(201).json({
            message: "new service added ! ",
            data: service
        });
    });
};

//handle service delete action
exports.delete = async (req, res) => {
    await Service.remove({
        _id: req.params.serviceId
    }, (err, service) => {
        if (err) res.status(404).json(err);
        res.status(200).json({
            message: "service deleted successfully ! "
        });
    });
};

//handle service update
exports.update = async  (req, res) => {
    await Service.findById(req.params.serviceId, (err, service)=>{
        if (err) res.status(404).json(err);
        service.name = req.body.name ? req.body.name : service.name;
        
        service.save( err => {
            if (err) res.status(400).json(err);
            res.status(200).json({
                message: "service updated successfully !",
                data: service
            });
        });

        
    });
};