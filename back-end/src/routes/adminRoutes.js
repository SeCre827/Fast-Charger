const express = require('express');
const adminController = require('../controllers/adminControllers');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
const upload = require('../middleware/upload');
const csvController = require('../controllers/csv.controller');
//baseURL = http://localhost:8765/evcharge/api

// ADMIN ENDPOINTS

// POST {baseURL}/admin/usermod/:username/:password
router.post(
  '/usermod/:username/:password',
  isAuth.isAdmin,
  adminController.postUser
);

// GET {baseURL}/admin/users/:username
router.get('/users/:username', isAuth.isAdmin, adminController.getUser);
// router.get('/users/:username',  adminController.getUser); // without auth

//POST {baseURL}/admin/system/sessionsupd
router.post(
  '/system/sessionsupd',
  isAuth.isAdmin,
  upload.single('file'),
  csvController.upload
);

// βοηθητικά endpoints

//{baseURL}/admin/healthcheck:
router.get('/healthcheck', adminController.getHealthcheck);
//{baseURL}/admin/resetsessions:
router.get('/resetSessions', adminController.getResetSessions);

module.exports = router;

// router.get('/api/csv/tutorials', csvController.getVehicleChargedTransaction);
// router.post('/system/sessionsupd', adminController.postFileUpload);
// router.post('/usermod', adminController.postUser);
