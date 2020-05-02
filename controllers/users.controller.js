const fs = require('fs');
const uniquid = require('uniqid');
const database_url = './database/users.json';
var database = JSON.parse(fs.readFileSync(database_url,{encoding:'utf8'}));

function saveDatabase() {
    fs.writeFile('./database/users.json',JSON.stringify(database),(err) => {
        if (err) throw err;
    });
}

module.exports.index = (req,res) => {
    var itemsPerPage = 5;
    var pages = Math.ceil(database.length / itemsPerPage);
    var result = database;
    if (typeof req.query.page !== 'undefined') {
        var begin = (req.query.page - 1) * itemsPerPage;
        var end = (req.query.page - 1) * itemsPerPage + itemsPerPage;
        result = result.slice(begin,end);
    }

    res.render('index.ejs', {
        title: 'BlahStation',
        page: 'list',
        data: result,
        pages: pages,
    });
}

module.exports.create = (req,res) => {
    res.render('index.ejs',{
        title : 'Add message',
        page : 'form',
        csrfToken : req.csrfToken(),
    });
}

module.exports.store = (req,res) => {
    database.push({
        id : uniquid(),
        nickname : req.body.nickname,
        description : req.body.description,
        image : req.file.filename,
    });
    saveDatabase();
    res.redirect('/users?page=1');
}

module.exports.edit = (req,res) => {
    var userFound = database.find(user => { return user.id == req.params.id; });
    res.render('index.ejs',{
        title: 'Edit message',
        page : 'edit',
        data: userFound,
    });
}

module.exports.update = (req,res) => {
    database.forEach(user => {
        if (user.id === req.body.id) {
            user.nickname = req.body.nickname;
            user.description = req.body.description;
        }
    });
    saveDatabase();
    res.redirect('/users');
}

module.exports.destroy = (req,res) => {
    database = database.filter(user => {
        return user.id !== req.params.id;
    });
    saveDatabase();
    res.redirect('/users?page=1');
}