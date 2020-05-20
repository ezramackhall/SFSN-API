const mongoose =require('mongoose');

const postalCodeSchema = (mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: {type: String, required: true}
}));

module.exports = mongoose.model('PostalCode', postalCodeSchema);