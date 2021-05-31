const { ObjectID } = require('bson');
let mongoose = require('mongoose');

const serviceProviderSchema = mongoose.Schema({
    user_id: {
        type: ObjectID,
        required: true
    },
    // choose between disabled and active
    status:{
        type: String,
        required: true
    },

    // service: [{ id: ObjectId, price: Number }, { id: ObjectId, price: Number }]
    services: {
        type: Array,
        required: true
    },

    // workingHours: {Monday: {workHours: "09:00 - 17:00", breaks: "12:00 - 13:00", Service: String}, Tuesday: {...}}
    working_hours: {
        type: Object,
        require: true
    },

    // dayOff: {date: Date, repeat_every_year: Boolean}
    day_off: {
        type: Object,
        required: true
    }
});

const ServiceProvider = module.exports = mongoose.model("service-provider", serviceProviderSchema);

module.exports.get = (callback, limit) => {
    ServiceProvider.find(callback).limit(limit);
};