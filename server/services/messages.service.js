const mysql = require('mysql')
const axios = require('axios')
const constantsWebBD = require('../../constants/constantsWebBD')
// const pagesPrayers = require('../../constants/clientConstants')
const pool = mysql.createPool(constantsWebBD.sqlConfig)

function poolConnection(req, res, resolve, reject, sqlQuery, params) {
    return pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query(sqlQuery, params, (err, rows) => {
            connection.release()

            if (!err) {
                // res.send(rows)
                resolve(rows)
            } else {
                console.log(err)
                return reject(err)
            }
        })
    })
}

class MessagesService {
    //  Get all for start page ==============================================
    getMessagesStartPage(req, res) {
        return new Promise((resolve, reject) => {
            console.log('get all from messages _ getMessagesStartPage')
            const tableName = 'users'
            const sqlQuery = `SELECT * from ${tableName}`

            poolConnection(req, res, resolve, reject, sqlQuery)
        })
    }

    // Get a user by table and by ID ==============================================
    getMessage(req, res) {
        return new Promise((resolve, reject) => {
            const tableName = req.params.table
            const sqlQuery = `SELECT * from ${tableName} WHERE id = ?`

            console.log('req.params_getMessage :>> ', req.params)
            console.log('sqlQuery :>> ', sqlQuery)

            poolConnection(req, res, resolve, reject, sqlQuery, [req.params.id])
        })
    }

    //  Get all Messages by table ==============================================
    getMessages(req, res) {
        return new Promise((resolve, reject) => {
            const tableName = req.params.table
            const sqlQuery = `SELECT * from ${tableName}`

            console.log('----------------')

            poolConnection(req, res, resolve, reject, sqlQuery)
        })
    }

    async createMessage(req, res) {
        return new Promise((resolve, reject) => {
            // console.log('req.params_createMessage', req.params)

            const tableName = 'messages'
            // const tableName = req.params.table
            const sqlQuery = `INSERT INTO ${tableName} SET ?`

            // let message = {
            //     user: msg.from.username,
            //     date: formattedDate,
            //     textMessage: textMessage,
            //     context: previousMessagesMessageId,

            //     // bot_id: req.body.bot_id,
            //     // bot_name: req.body.bot_name,
            // }

            // try {
            //     await poolConnection(sqlQuery, req)
            // } catch {
            //     console.log('error_createRequest')
            // }

            // console.log('req55555 :>> ', req)
            poolConnection(req, res, resolve, reject, sqlQuery, req)
            console.log('New message writed to BD : ', req)
        })
    }

    updateMessage(req, res) {
        return new Promise((resolve, reject) => {
            console.log('req.body_updateMessage', req.body)
            const {
                id,
                original,
                translate,
                description,
                periodStart,
                periodEnd,
            } = req.body
            const tableName = req.params.table
            const sqlQuery = `UPDATE ${tableName} SET original = ?,  translate = ?,  description = ? ,  periodStart = ? ,  periodEnd = ?  WHERE id = ?`
            poolConnection(req, res, resolve, reject, sqlQuery, [
                original,
                translate,
                description,
                periodStart,
                periodEnd,
                id,
            ])
        })
    }

    deleteMessage(req, res) {
        return new Promise((resolve, reject) => {
            console.log('DELETE id :>> ')
            const tableName = req.params.table
            const sqlQuery = `DELETE from ${tableName} WHERE id = ?`
            poolConnection(req, res, resolve, reject, sqlQuery, [req.params.id])
        })
    }

    // deleteTable(req, res) {
    //     return new Promise((resolve, reject) => {
    //         const tableName = req.params.table
    //         const sqlQuery = `DELETE from ${tableName} WHERE id >0`
    //         console.log('req.params_deleteTable :>> ', req.params)
    //         console.log('sqlQuery :>> ', sqlQuery)
    //         poolConnection(req, res, resolve, reject, sqlQuery)
    //     })
    // }
}

module.exports = new MessagesService()
