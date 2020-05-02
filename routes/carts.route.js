const express = require('express');
const route = express.Router();
const controller = require('../controllers/carts.controller');

route.get('/',controller.index);

route.get('/add/:user_id',controller.store);

module.exports = route;