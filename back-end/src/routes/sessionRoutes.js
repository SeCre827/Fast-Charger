const express = require('express');
const sessionControllers = require('../controllers/sessionControllers');
const usecaseControllers = require('../controllers/usecaseControllers');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

//2a GET {baseURL}/SessionsPerPoint/:pointID/:yyyymmdd_from/:yyyymmdd_to

router.get(
  '/SessionsPerPoint/:pointID/:yyyymmdd_from/:yyyymmdd_to',
  isAuth.isAdminOrStationAdmin,
  sessionControllers.getSessionsPerPoint
);

//2b GET {baseURL}/SessionsPerStation/:stationID/:yyyymmdd_from/:yyyymmdd_to

router.get(
  '/SessionsPerStation/:stationID/:yyyymmdd_from/:yyyymmdd_to',
  isAuth.isAuth,
  sessionControllers.getSessionsPerStation
);

// 2c GET {baseURL}/SessionsPerEV/:vehicleID/:yyyymmdd_from/:yyyymmdd_to
//TODO αν θελω να κανω τον user να μπορει να δει μονο το αμαξι του.
router.get(
  '/SessionsPerEV/:vehicleID/:yyyymmdd_from/:yyyymmdd_to',
  isAuth.isAuth,
  sessionControllers.getSessionsPerEV
);

//2d GET {baseURL}/SessionsPerProvider/:providerID/:yyyymmdd_from/:yyyymmdd_to
router.get(
  '/SessionsPerProvider/:providerID/:yyyymmdd_from/:yyyymmdd_to',
  isAuth.isAdminOrStationAdmin,
  sessionControllers.getSessionsPerProvider
);

//usecase2 Stations info
router.get('/Usecase2', isAuth.isAuth, usecaseControllers.getUsecase2);

module.exports = router;
