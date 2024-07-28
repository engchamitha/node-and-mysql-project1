const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/selectAllUsers', userController.selectAllUsers);
router.post('/selectUserByUsername', userController.selectUserByUsername);
router.post('/insertUser', userController.insertUser);
router.put('/updateUserById', userController.updateUserById);
router.delete('/deleteUserById', userController.deleteUserById);

module.exports = router;