const customErrorHandler = require('../error/customError');
const tryCarchMiddleware = require('../middleware/tryCarchMiddleware');
const helper = require('../helper/helper');
const roleModel = require('../models/roleModel');
const permissionModel = require('../models/permissionModels');
const roleAndPermissionModel = require('../models/rolePermissionModel');
const { roleName } = require('../helper/data');

module.exports.createRole = tryCarchMiddleware(async (req, res, next) => {
    const { roleName, permission } = req.body;
    const createRole = await roleModel.create({ roleName });

    await roleAndPermissionModel.create({ roleId: createRole._id, permissionId: permission })

    res.status(200).json({ status: true, message: 'Role created successfully.' });

});

module.exports.getRoles = tryCarchMiddleware(async (req, res, next) => {
    let roles = await roleModel.find({ roleName: { $ne: roleName.admin } });


    return res.status(200).json({ roles, status: true });
});

module.exports.allPermission = tryCarchMiddleware(async (req, res, next) => {
    const permissions = await permissionModel.find();

    return res.status(200).json({ permissions, status: true });
});

module.exports.userPermission = tryCarchMiddleware(async (req, res, next) => {

    const adminRoleId = await roleModel.findOne({ roleName: roleName.admin });

    const rolePermissions = await roleAndPermissionModel.find({ roleId: { $ne: adminRoleId._id } })
        .populate({ path: 'roleId' })
    // .populate({ path: 'permissionId' })


    return res.status(200).json({ rolePermissions, status: true });
});

module.exports.deleteRole = tryCarchMiddleware(async (req, res, next) => {
    const { id } = req.params;
    const deleteRole = await roleModel.deleteOne({ _id: id });

    const permissions = await roleAndPermissionModel.deleteOne({ roleId: id });
    if (deleteRole.deletedCount === 0 || permissions.deletedCount === 0) {
        next(customErrorHandler("Something went Wrong"))
    }

    res.status(200).json({ status: true, message: 'Role deleted successfully' });
})