import express from 'express';
require('dotenv').load();

var router = express.Router();
var jwt = require('express-jwt');

//TODO find why process.env.JWT_SECRET is undefined here but not in user.js
var auth = jwt({
    secret : process.env.JWT_SECRET,
    userProperty : 'payload'
});

// import controlers
import userController from '../controllers/userController';
import teamController from '../controllers/teamController';

/**
 * Router
 * map every request to controller
 */

//TODO add authentication back

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/teams', teamController.list);

router.get('/teams/:id', teamController.detail)

router.post('/teams/addNew', teamController.addNewTeam);

router.post('/teams/:id/addStudent', teamController.addStudent);

router.get('/teams/:id/:studentId', teamController.detailStudent);

router.post('/teams/:id/:studentId/addTest', teamController.addTest);

// export the router
export default router;
