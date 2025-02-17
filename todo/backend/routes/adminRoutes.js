const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController')
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

router.use(authMiddleware)

router.use(adminMiddleware)

router.get('/users',adminController.getAllUsers)

module.exports = router;
