const express = require('express')
const app = express()
const routes = require('./routes/index')

const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = (bot) => {
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(cors())

    // app.use('/', routes)

    const PORT = process.env.PORT || 8000

    app.listen(PORT, () => {
        console.log('Web server started at port : ', PORT)
    })
}
