
const mongoose = require('mongoose');

const rolePermissionSchema = new mongoose.Schema({
    roleId: {
        type: 'ObjectId',
        require: true,
        ref: 'role',
    },
    permissionId: [
        {
            type: 'ObjectId',
            require: true,
            ref: 'permission'
        }
    ]
}, { timestamps: true });


module.exports = mongoose.model('RolePermission', rolePermissionSchema);
