let mongoose = require('mongoose');

var serviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    service_providers: {
        type: Array,
        required: true
    }
});


const Service = module.exports = mongoose.model("services", serviceSchema);

module.exports.get = (callback, limit) => {
    Service.find(callback).limit(limit);
};