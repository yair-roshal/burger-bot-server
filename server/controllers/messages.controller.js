const MessagesService = require('../services/messages.service.js')

class MessagesController {
    // async getMessagesStartPage(req, res) {
    //     const result = await MessagesService.getMessagesStartPage(req, res)

    //     if (result) return res.status(200).send(result)
    //     else return res.status(500).send({ message: 'error.' })
    // }

    // async getMessage(req, res) {
    //     const result = await MessagesService.getMessage(req, res)

    //     if (result) return res.status(200).send(result)
    //     else return res.status(500).send({ message: 'error.' })
    // }

    // async getMessages(req, res) {
    //     const result = await MessagesService.getMessages(req, res)

    //     if (result) return res.status(200).send(result)
    //     else return res.status(500).send({ message: 'error.' })
    // }

    async createMessage(req, res) {
        const result = await MessagesService.createMessage(req, res)

        if (result) return res.status(200).send(result)
        else return res.status(500).send({ message: 'error.' })
    }

    async updateMessage(req, res) {
        const result = await MessagesService.updateMessage(req, res)

        if (result) return res.status(200).send(result)
        else return res.status(500).send({ message: 'error.' })
    }

    async deleteMessage(req, res) {
        const result = await MessagesService.deleteMessage(req, res)

        if (result) return res.status(200).send(result)
        else return res.status(500).send({ message: 'error.' })
    }

    async deleteTable(req, res) {
        const result = await MessagesService.deleteTable(req, res)

        if (result) return res.status(200).send(result)
        else return res.status(500).send({ message: 'error.' })
    }
}

module.exports = new MessagesController()
