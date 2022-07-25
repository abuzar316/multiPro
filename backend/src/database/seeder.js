const roleModel = require('../models/roleModel');
const permissionModel = require('..//models/permissionModels');
const userModel = require('..//models/usersModels');
const helper = require('../helper/helper');
const { permissionName, roleName } = require('../helper/data');
const connect = require('./connection');
const roleAndPermission = require('../models/rolePermissionModel');

connect();
// create table
const createTable = async () => {
    try {
        // create role in database
        const roleData = [{ roleName: roleName.admin }, { roleName: roleName.vendor }, { roleName: roleName.user }];
        await roleModel.create(roleData);
        console.log("-------------roles inserted successfully-------------");

        //  permission inserted in database successfully
        const permissionData = [
            { permissionName: permissionName.createUser },
            { permissionName: permissionName.editUser },
            { permissionName: permissionName.deleteUser },
            { permissionName: permissionName.readUser },
            { permissionName: permissionName.createRole },
            { permissionName: permissionName.editRole },
            { permissionName: permissionName.deleteRole },
            { permissionName: permissionName.readRole },
        ];
        await permissionModel.create(permissionData);
        console.log("-------------permission inserted successfully-------------");

        const userRoleData = await roleModel.findOne({ roleName: roleName.user });
        const adminRoleData = await roleModel.findOne({ roleName: roleName.admin });
        const venderRoleData = await roleModel.findOne({ roleName: roleName.vendor });
        const permissionCreateUser = await permissionModel.findOne({ permissionName: permissionName.createUser });
        const permissionEditUser = await permissionModel.findOne({ permissionName: permissionName.editUser });
        const permissionReadUser = await permissionModel.findOne({ permissionName: permissionName.readUser });
        const permissionAddData = [
            {
                roleId: venderRoleData._id, permissionId: [
                    permissionCreateUser._id, permissionEditUser._id, permissionReadUser._id
                ]
            },
            {
                roleId: adminRoleData._id, permissionId: []
            },
            {
                roleId: userRoleData._id, permissionId: []
            }
        ]
        await roleAndPermission.create(permissionAddData);
        console.log("-------------assin permission vender role-------------");

        // admin user create
        const userData = [
            { email: "abuzar@gmail.com", name: "Abuzar", username: 'mabuzar', gender: "male", password: await helper.hashPassword("Chetu@123"), roleId: adminRoleData._id },
            { email: "monu@gmail.com", name: "monu", username: 'monur', gender: "male", password: await helper.hashPassword("Chetu@123"), roleId: venderRoleData._id }
        ]
        await userModel.create(userData)
        console.log("-------------admin user created successfully-------------");
    } catch (error) {
        console.log("error: " + error.message);
    }
}

createTable();


