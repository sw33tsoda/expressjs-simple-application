const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.route');
const cartRoutes = require('./routes/carts.route');
const cookieParser = require('cookie-parser');
const session = require('./middlewares/session.middleware');
const csurf = require('csurf');


// IN ACTIVE
app.use('/css',express.static('css'));
app.use('/database',express.static('database'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('secret'));
app.use(session);
app.set('template view','ejs');
app.set('views','./views');

app.use(csurf({cookie:true}));
app.use('/users',userRoutes);
app.use('/cart',cartRoutes);

app.listen(port, () => {
    console.log(`running at ${port} ♥`);
});

