const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        require: true,
    }
}, { timestamps: true });


module.exports = mongoose.model('role', roleSchema);