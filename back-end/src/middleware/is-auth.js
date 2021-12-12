const e = require('express');
const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/tokenBlacklist');

exports.isAuth = (req, res, next) => {
  const authHeader = req.get('XOBSERVATORY-AUTH');
  if (!authHeader) {
    const error = new Error(
      'Not authenticated. You have to at least send some Authorization headers!'
    );
    error.statusCode = 401;
    res.status(error.statusCode).send(error.message);
    throw error;
  }

  TokenBlacklist.findOne({ where: { token: authHeader } })
    .then(tokenn => {
      if (tokenn) {
        const error = new Error(
          'Your credentials are not valid anymore.You have to login in again to get new ones.'
        );
        error.statusCode = 401;
        res.status(error.statusCode).send(error.message);
        throw error;
      } else {
        //   const token = req.get('Authorization').split(' ')[1]; // if a have Bearer(convention) i use this.
        const token = authHeader;
        let decodedToken;
        try {
          decodedToken = jwt.verify(token, 'secretkeythatonlytheserverhas');
        } catch (err) {
          err.statusCode = 500; //TODO maybe this must not be here
          res.status(err.statusCode).send(err.message);
          throw err;
        }
        // we come here if decoding worked
        // now we check if the token was valid or not
        if (!decodedToken) {
          const error = new Error('Not authenticated.');
          error.statusCode = 401;
          res.status(err.statusCode).send(err.message); //TODO maybe this must not be here
          throw error;
        }
        // now we have a valid token
        // we put the valid token into the req.usedId so we can use it in the other places this request goes.
        req.userId = decodedToken.userId;
        req.rights = decodedToken.rights;
        next();
      }
    })
    .catch(err => {
      res.status(err.statusCode).send(err.message);
      console.log(err);
    });
};

exports.isAdmin = (req, res, next) => {
  const authHeader = req.get('XOBSERVATORY-AUTH');
  if (!authHeader) {
    const error = new Error(
      'Not authenticated. You have to at least send some Authorization headers!'
    );
    error.statusCode = 401;
    res.status(error.statusCode).send(error.message);
    throw error;
  }
  TokenBlacklist.findOne({ where: { token: authHeader } })
    .then(tokenn => {
      if (tokenn) {
        const error = new Error(
          'Your credentials are not valid anymore.You have to login in again to get new ones.'
        );
        error.statusCode = 401;
        res.status(error.statusCode).send(error.message);
        throw error;
      } else {
        const token = authHeader;
        let decodedToken;
        try {
          decodedToken = jwt.verify(token, 'secretkeythatonlytheserverhas');
        } catch (err) {
          err.statusCode = 500; //TODO maybe this must not be here
          res.status(err.statusCode).send(err.message);
          throw err;
        }
        // we come here if decoding worked
        // now we check if the token was valid or not
        if (!decodedToken) {
          const error = new Error('Not authenticated.');
          error.statusCode = 401;
          res.status(err.statusCode).send(err.message); //TODO maybe this must not be here
          throw error;
        }
        // now we have a valid token
        // we put the valid token into the req.usedId so we can use it in the other places this request goes.
        req.userId = decodedToken.userId;
        req.rights = decodedToken.rights;
        if (req.rights.toLowerCase() != 'admin') {
          const error = new Error(
            'Not authenticated. You have no admin rights!'
          );
          error.statusCode = 401;
          res.status(error.statusCode).send(error.message);
          throw error;
        }

        next();
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.isAdminOrStationAdmin = (req, res, next) => {
  const authHeader = req.get('XOBSERVATORY-AUTH');
  if (!authHeader) {
    const error = new Error(
      'Not authenticated. You have to at least send some Authorization headers!'
    );
    error.statusCode = 401;
    res.status(error.statusCode).send(error.message);
    throw error;
  }
  TokenBlacklist.findOne({ where: { token: authHeader } })
    .then(tokenn => {
      if (tokenn) {
        const error = new Error(
          'Your credentials are not valid anymore.You have to login in again to get new ones.'
        );
        error.statusCode = 401;
        res.status(error.statusCode).send(error.message);
        throw error;
      } else {
        const token = authHeader;
        let decodedToken;
        try {
          decodedToken = jwt.verify(token, 'secretkeythatonlytheserverhas');
        } catch (err) {
          err.statusCode = 500; //TODO maybe this must not be here
          res.status(err.statusCode).send(err.message);
          throw err;
        }
        // we come here if decoding worked
        // now we check if the token was valid or not
        if (!decodedToken) {
          const error = new Error('Not authenticated.');
          error.statusCode = 401;
          res.status(err.statusCode).send(err.message); //TODO maybe this must not be here
          throw error;
        }
        // now we have a valid token
        // we put the valid token into the req.usedId so we can use it in the other places this request goes.
        req.userId = decodedToken.userId;
        req.rights = decodedToken.rights;
        if (
          req.rights.toLowerCase() == 'admin' ||
          req.rights.toLowerCase() == 'stationadmin'
        ) {
          next();
        } else {
          const error = new Error(
            'Not authenticated. You have no admin rights!'
          );
          error.statusCode = 401;
          res.status(error.statusCode).send(error.message);
          throw error;
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
};
