const express = require('express'),
    router = express.Router(),
    messagesRoutes = require('./messages.routes')

router.use('/', messagesRoutes)
// router.use('/web-data', messagesRoutes)

 
module.exports = router
