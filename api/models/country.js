const mongoose =require('mongoose');

const countrySchema = (mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    countryName: {type: String, required: true}
}));

module.exports = mongoose.model('Country', countrySchema);