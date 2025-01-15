const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
});

module.exports = mongoose.model('MongoPet', PetSchema);