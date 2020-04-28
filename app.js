const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.route');
const cookieParser = require('cookie-parser');

// IN ACTIVE
app.use('/css',express.static('css'));
app.use('/database',express.static('database'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.set('template view','ejs');
app.set('views','./views');
app.use('/users',userRoutes);


app.listen(port, () => {
    console.log(`running at ${port} ♥`);
});

