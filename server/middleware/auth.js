const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  //NO COOKIES
  if (Object.keys(req.cookies).length === 0) {
    req.session = {};
    models.Sessions.create()
      .then((newhash)=> {
        return models.Sessions.get( { id: newhash.insertId } ); //421
      })
      .then(record => {
        req.session = { hash: record.hash}; //375
        res.cookies = { 'shortlyid': { value: record.hash } }; //388
        next();
      });
    //YES COOKIES
  } else {
    //GOOD COOKIES
    req.session = {};
    req.session.hash = { 'shortlyid': { value: req.cookies.shortlyid }}; //400
    models.Sessions.get( { hash: req.cookies.shortlyid } )
      .then(record => {
        if (req.userId === null) {
          throw new Error('AAAH');
        }
        //BAD COOKIES
        if (record === undefined) {
          models.Sessions.create()
            .then((newhash)=> {
              return models.Sessions.get( { id: newhash.insertId } );
            })
            .then(record => {
              req.session = { hash: record.hash};
              res.cookies = { 'shortlyid': { value: record.hash } };
              next();
            });
        }
        return models.Users.get( { id: record.userId } );
      })
      .then(record => {
        req.session.user = {};
        req.session.user = { username: record.username };
        req.session.userId = record.id;
        next();
      })
      .catch((err) => {
        next();
      });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

//REMINDER: Session is undefined
//look into why models.Sessions.create is not passing