const tryCarchMiddleware = require('./tryCarchMiddleware');
const helper = require('../helper/helper');
const customErrorHandler = require('../error/customError');
const userModel = require('../models/usersModels');
const { roleName } = require('../helper/data');
const roleModel = require('../models/roleModel');
const rolePermissions = require('../models/rolePermissionModel');
const permissionModel = require('../models/permissionModels');

module.exports.verifyToken = tryCarchMiddleware(async (req, res, next) => {

    const authorization = req.headers.authorization;

    // console.log(authorization)

    if (authorization === undefined || authorization === null) {
        return next(customErrorHandler("Not authorized"));
    }

    const token = authorization.replace("Bearer ", "");

    const verifyToken = helper.verifyToken(token);
    // console.log(verifyToken)
    // console.log("first")
    let allPermissions = [];

    const user = await userModel.findOne({ _id: verifyToken.id }).populate({ path: "roleId", Model: roleModel });

    const roleAndPermission = await rolePermissions.findOne({ roleId: user.roleId }).populate({ path: 'permissionId', Model: permissionModel });

    roleAndPermission.permissionId.forEach((e) => {
        allPermissions.push(e.permissionName);
    })
    

    req.user = user;
    req.userRole = user.roleId.roleName;
    req.permission = allPermissions;

    next();

})


module.exports.permission = (apiPermission) => {
    return tryCarchMiddleware((req, res, next) => {
        // console.log("first")
        switch (true) {
            case (req.userRole === roleName.admin):
                return next();
            case (req.permission.includes(apiPermission)):
                return next();
            default:
                return next(customErrorHandler("this user is not allowed!"));
        }
    })
}