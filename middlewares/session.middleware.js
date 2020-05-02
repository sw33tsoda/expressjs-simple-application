var uniqid = require('uniqid');

module.exports = (req,res,next) => {
    if (!req.signedCookies.sessionId) {
        res.cookie('sessionId', uniqid(), {
            signed:true,
            maxAge:10,
        });
    }
    next();
}