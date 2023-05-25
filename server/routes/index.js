const express = require('express'),
    router = express.Router(),
    messagesRoutes = require('./messages.routes')

router.use('/', messagesRoutes)
 
module.exports = router
