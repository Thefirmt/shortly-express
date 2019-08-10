const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (Object.keys(req.cookies).length === 0) {
    models.Sessions.create();
  }
  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

//REMINDER: Session is undefined
//look into why models.Sessions.create is not passing