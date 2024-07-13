const router = require('express').Router();
const dashboardRoutes = require('./dashboard-routes.js');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;