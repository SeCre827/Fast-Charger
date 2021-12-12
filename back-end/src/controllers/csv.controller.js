const Transaction = require('../models/transaction');

const fs = require('fs');
const csv = require('fast-csv');

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send('Please upload a CSV file!');
    }

    let tutorials = [];
    let path =
      __basedir + '/resources/static/assets/uploads/' + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => {
        throw error.message;
      })
      .on('data', row => {
        tutorials.push(row);
      })
      .on('end', () => {
        Transaction.bulkCreate(tutorials)
          .then(() => {
            let SessionsInUploadedFile = tutorials.length;
            let SessionsImported = tutorials.length;
            let TotalSessionsInDatabase;

            Transaction.findAll()
              .then(user => {
                TotalSessionsInDatabase = user.length;
                // console.log(
                //   SessionsInUploadedFile,
                //   SessionsImported,
                //   TotalSessionsInDatabase
                // );
                SessionsImported;
                SessionsImported;
                res.json({
                  SessionsInUploadedFile: SessionsInUploadedFile,
                  SessionsImported: SessionsImported,
                  TotalSessionsInDatabase: TotalSessionsInDatabase,
                });
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(error => {
            res.status(500).send({
              message: 'Fail to import data into database!',
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Could not upload the file: ' + req.file.originalname,
    });
  }
};

const getVehicleChargedTransaction = (req, res) => {
  VehicleChargedTransaction.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};

module.exports = {
  upload,
  getVehicleChargedTransaction,
};
