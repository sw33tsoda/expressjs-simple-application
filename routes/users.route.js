const express = require('express');
const route = express.Router();
const controller = require('../controllers/users.controller');

route.get('/',controller.index);

route.get('/form', controller.create);

route.post('/form/post',(req,res,next) => {
    var errors = [];
    if (req.body.nickname.length < 8) errors.push('Nickname : Minimum 8 letters');
    if (req.body.description.length < 32) errors.push('Description : Minimum 32 letters');
    if (errors.length > 0) {
        res.render('index.ejs',{
            title: 'Add message',
            page:'form',
            errors:errors,
        });
        return;
    }
    next();
}, controller.store);

route.get('/edit/:id', controller.edit);

route.post('/edit/update', controller.update);

route.get('/delete/:id', controller.destroy);

module.exports = route;