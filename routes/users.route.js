const express = require('express');
const route = express.Router();
const controller = require('../controllers/users.controller');
const multer = require('multer');

const upload_images_dir = 'uploads/images/';
const storage = multer({dest: upload_images_dir});

route.get('/',controller.index);

route.get('/form', controller.create);

route.post('/form/post',

    storage.single('image'), // MIDDLEWARE - FILE

    (req,res,next) => { // MIDDLEWARE - VALIDATION
        var errors = [];
        req.file.filename = upload_images_dir + req.file.filename;
        // console.log(req.file);
        console.log(req.body);
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
    }, 

    controller.store // CONTROLLER
);

route.get('/edit/:id', controller.edit);

route.post('/edit/update', controller.update);

route.get('/delete/:id', controller.destroy);


module.exports = route;