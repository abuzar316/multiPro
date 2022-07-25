const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
}, { timestamps: true });


module.exports = mongoose.model('user', userSchema);




