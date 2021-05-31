//import user model
const ServiceProvider = require('../models/serviceProviderModel');
const User = require('../models/userModel');

//get all services providers
exports.index = async (req, res) => {
    await ServiceProvider.get( (err, services) => {
        if (err) 
            res.status(404).json({
                error: err
            });
        res.status(200).json( services );
    });
};

//handle register new service provider action
exports.new = async (req, res) => {
    try {
        //user registration
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mail: req.body.mail,
            password: req.body.password,
            account_type: "service-provider",
            number: req.body.number
        });
        const user_data = await user.save();
        await user.generateAuthToken();

        //service provider registration
        const serviceProvider = new ServiceProvider({
            user_id: user_data._id,
            services: req.body.services,
            working_hours: req.body.working_hours,
            day_off: req.body.day_off
        });
        let data = await serviceProvider.save();
        res.status(201).json(data);
    } catch (err) {
        res.status(404).json({ err: err });
    };
};

//handle service update
exports.update = async (req, res) => {
    try {
        await ServiceProvider.findById(req.params.serviceProviderId, (err, serviceProvider) => {
            
            User.findById(serviceProvider.user_id, (error, user) => {
                user.first_name = req.body.first_name ? req.body.first_name : user.first_name;
                user.last_name = req.body.last_name ? req.body.last_name : user.last_name;
                user.mail = req.body.mail ? req.body.mail : user.mail;
                user.password = req.body.password ? req.body.password : user.password;
                user.account_type = req.body.account_type ? req.body.account_type : user.account_type;
                user.number = req.body.number;

                const user_data = user.save();

                serviceProvider.user_id = user_data._id ? user_data._id : serviceProvider.user_id;
                serviceProvider.serices = req.body.serices ? req.body.serices : serviceProvider.serices;
                serviceProvider.working_hours = req.body.working_hours ? req.body.working_hours : serviceProvider.working_hours;
                serviceProvider.day_off =  req.body.day_off ? req.body.day_off : serviceProvider.day_off;
        
                serviceProvider.save();
                res.status(200).json({data: serviceProvider});
            });
        });
    } catch (error) {
        res.status(404).json(error);
    }

};

//handle services provider delete action
exports.delete = async (req, res) => {
    await ServiceProvider.findById (req.params.serviceProviderId, (err, serviceProvider)=>{
        User.remove({_id: serviceProvider.user_id}, err => {
            if (err) if (err) res.status(404).json(err);
        })
    });
    await ServiceProvider.remove({
        _id: req.params.serviceProviderId
    }, (err, serviceProvider) => {
        if (err) res.status(404).json(err);
        res.status(200).json({
            message: "service deleted successfully ! ",
        });
    });
};