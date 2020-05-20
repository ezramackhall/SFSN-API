const mongoose =require('mongoose');

const provinceSchema = (mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true}
}));

module.exports = mongoose.model('Province', provinceSchema);