const Station = require('../models/station');

exports.getUsecase2 = (req, res, next) => {
  let stations = [];
  Station.findAndCountAll(
    //   { where: {} },
    {
      attributes: [
        'name',
        'country',
        'city',
        'street',
        'number',
        'telephone',
        'email',
        'website',
      ],
    }
  )
    .then(({ count, rows }) => {
      for (let index = 0; index < count; index++) {
        stations.push(rows[index].dataValues);
      }
      //   console.log(stations[0].dataValues);

      res.json(stations);
    })
    //   Station.findAll({ where: {} })
    //     .then(stations => {
    //       //   console.log(stations[0].dataValues);
    //       console.log(stations);

    //       res.json({ Status: 'OK' });
    //     })
    .catch(err => {
      console.log(err);
      res.status(400).send('An error occured.');
    });
};
