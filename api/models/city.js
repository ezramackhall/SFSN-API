const mongoose =require('mongoose');

const citySchema = (mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cityName: {type: String, required: true}
}));

module.exports = mongoose.model('City', citySchema);