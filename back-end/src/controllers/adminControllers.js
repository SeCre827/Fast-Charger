const User = require('../models/user');
let converter = require('json-2-csv');
const Charger = require('../models/charger');
// const { Transaction } = require('sequelize/types');
const Transaction = require('../models/transaction');

//Υποστηρίζει τη μέθοδο POST για την προσθήκη νέου χρήστη ή την αλλαγή password αν ο χρήστης υπάρχει ήδη.
//url: localhost:8765/evcharge/api/admin/usermod/:username/:password
exports.postUser = (req, res, next) => {
  // const username = req.body.username;
  let username = req.params.username;
  let password = req.params.password;
  // const password = req.body.password;
  const email = req.body.email;
  const rights = req.body.rights;
  User.findOne({ where: { username: username } }).then(user => {
    if (user) {
      user
        .update({
          password: password,
        })
        .then(result => {
          res.status(200).send('Updated Password.');
        })
        .catch(err => {
          console.log(err);
          res.status(400).send('An error occured.');
        });
    } else {
      User.findOne({ where: { email: email } })
        .then(user => {
          if (user) {
            const error = new Error('A user with this e-mail already exists.');
            error.statusCode = 400;
            res.status(error.statusCode).send(error.message);
            throw error;
          } else {
            User.create({
              rights: rights,
              username: username,
              password: password,
              email: email,
            })
              .then(result => {
                res.status(200).send('User Created.');
              })
              .catch(err => {
                console.log(err);
                res.status(400).send('An error occured.');
              });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(400).send('Bad Request.');
        });
    }
  });
};

//Υποστηρίζει τη μέθοδο GET για την ανάγνωση των στοιχείων του συγκεκριμένου χρήστη
// localhost:8765/evcharge/api/admin/users/:username
exports.getUser = (req, res, next) => {
  var username = req.params.username;
  User.findOne({ where: { username: username } })
    .then(user => {
      if (user) {
        if (req.query.format == null || req.query.format == 'json') {
          res.json(user);
        } else if (req.query.format == 'csv') {
          converter.json2csv(user.toJSON(), (err, csv) => {
            if (err) {
              throw err;
            }

            // print CSV string
            res.send(csv);
          });
        } else res.status(400).send('Bad request. Check the parameters');
      } else {
        res.status(402).send('No data.');
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('An error occured.');
    });
};

//Boηθητικά Endpoints
// localhost:8765/evcharge/api/admin/healthcheck
exports.getHealthcheck = (req, res, next) => {
  Charger.findAll()
    .then(users => {
      res.json({ Status: 'OK' });
    })
    .catch(err => {
      console.log(err);
      res.json({ Status: 'Failed' });
    });
};

exports.getResetSessions = (req, res, next) => {
  Transaction.destroy({
    truncate: true,
  })
    .then(data => {
      return User.create({
        rights: 'Admin',
        username: 'admin',
        password: 'petrol4ever',
        email: 'test@mail.com',
      });
    })
    .then(data => {
      res.json({ Status: 'OK' });
    })
    .catch(err => {
      console.log(err);
      res.json({ Status: 'Failed' });
    });
};
