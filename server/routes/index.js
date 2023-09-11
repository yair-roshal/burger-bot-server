const express = require('express'),
    router = express.Router(),
    ordersRoutes = require('./orders.routes')

router.use('/', ordersRoutes)
 
 
module.exports = router
