const router = require('express').Router();

// authentication  middleware
const { verifyToken, permission } = require('../middleware/auth');
const { permissionName } = require('../helper/data');

// import controllers
const userController = require('../controller/usersController');
const roleController = require('../controller/roleController');


router.post('/api/v0/register', userController.register);

router.post('/api/v0/login', userController.login);

router.get('/api/v0/profile', verifyToken, userController.profile);

router.put('/api/v0/profileupdate', verifyToken, userController.profileUpdate);

router.put('/api/v0/changepassword', verifyToken, userController.changePassword);

router.get('/api/v0/allusers', verifyToken, permission(permissionName.readUser), userController.allUser);

router.delete('/api/v0/deleteuser/:id', verifyToken, permission(permissionName.deleteUser), userController.deleteUser);

router.put('/api/v0/edituser/:id', verifyToken, permission(permissionName.editUser), userController.editUser);

router.post('/api/v0/data', userController.data);

router.get('/api/v0/allroles', verifyToken, roleController.getRoles);

router.get('/api/v0/user/permission', verifyToken, permission(permissionName.readRole), roleController.userPermission);

router.get('/api/v0/all/permission', roleController.allPermission);

router.post('/api/v0/create/role', verifyToken, permission(permissionName.createRole), roleController.createRole);

router.delete('/api/v0/delete/role/:id', verifyToken, permission(permissionName.deleteRole), roleController.deleteRole);




module.exports = router;