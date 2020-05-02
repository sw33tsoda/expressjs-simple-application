var fs = require('fs');
var database_url = './database/carts.json';
var database = JSON.parse(fs.readFileSync(database_url,{encoding:'utf8'}));

function saveDatabase() {
    fs.writeFile(database_url,JSON.stringify(database),err => {
        if (err) throw err;
    });
}

module.exports.index = (req,res) => {
    var filteredDatabase = database.session.filter(cart => { return req.signedCookies.sessionId == cart.sessionId});
    res.send(filteredDatabase);
}

module.exports.store = (req,res) => {
    database.session.push({
        sessionId : req.signedCookies.sessionId,
        userId: req.params.user_id,
    });
    saveDatabase();
    res.redirect('/users');
}