const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const toDoController = require('../controllers/toDoController');


router.get('/selectAllUsers', userController.selectAllUsers);
router.post('/selectUserByUsername', userController.selectUserByUsername);
router.post('/insertUser', userController.insertUser);
router.put('/updateUserById', userController.updateUserById);
router.delete('/deleteUserById', userController.deleteUserById);

router.get('/selectAllToDo', toDoController.selectAllToDo);
router.post('/selectToDoById', toDoController.selectToDoById);
router.post('/insertToDo', toDoController.insertToDo);
router.put('/updateToDoById', toDoController.updateToDoById);
router.delete('/deleteToDoById', toDoController.deleteToDoById);

module.exports = router;