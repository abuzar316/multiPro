const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    permissionName: {
        type: String,
        require: true,
    }
}, { timestamps: true });


module.exports = mongoose.model('permission', permissionSchema);