const mongoose =require('mongoose');

const userSchema = (mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    roleId: {type: mongoose.Schema.Types.ObjectId, ref:'Role', required: true},
    email: {type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    streetNumber: {type: Number, required: true},
    streetName: {type: String, required: true},
    cityId: {type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true},
    provinceId: {type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true},
    countryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true},
    postalCodeId: {type: mongoose.Schema.Types.ObjectId, ref: 'PostalCode', required: true},
    phoneNumber: {type: String, required: true}
}));

module.exports = mongoose.model('User', userSchema);