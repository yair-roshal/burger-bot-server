const express = require('express')
const router = express.Router()
const MessageController = require('../controllers/messages.controller.js')

// router
//     .route('/:user')
//     .get(MessageController.getMessages)
//     .post(MessageController.createMessage)
//     .delete(MessageController.deleteTable)

router
    .route('/')
    // .route('/:user/:request_id')
    // .route('/:user/:id')
    // .get(MessageController.getMessage)

    .post(MessageController.createMessage)

// .put(MessageController.updateMessage)
// .delete(MessageController.deleteMessage)

module.exports = router
