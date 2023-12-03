const mysql = require("mysql2/promise")
const { sqlConfig } = require("../../constants/sqlConfig")
const axios = require("axios")
const https = require("https")
const { generateDateTime } = require("../helpers/utils")

class OrdersService {
	constructor() {
		this.pool = mysql.createPool(sqlConfig) // Создаем пул соединений
	}

	// Метод для выполнения запросов к базе данных
	async executeQuery(sqlQuery, values) {
		const connection = await this.pool.getConnection()

		try {
			const [results] = await connection.execute(sqlQuery, values)
			return results
		} catch (error) {
			console.error("Error executing SQL query:", error)
			throw error
		} finally {
			connection.release() // Вернуть соединение в пул после использования
		}
	}

	// getOrders ================================================
	async getOrders() {
		const sqlQuery = "SELECT * FROM orders"
		return this.executeQuery(sqlQuery, [])
	}

	// pay_credit_card ================================================
	async pay_credit_card(req, res) {
		const queryParameters = {
			supplier: "burger", // 'terminal_name' should be replaced by actual terminal name
			sum: "45.70",
			currency: "1", // ILS
			ccno: "12312312", // Test card number
			expdate: "0824", // Card expiry date: mmyy
		}

		// Prepare query string
		const queryString = Object.entries(queryParameters)
			.map(([name, value]) => `${name}=${value}`)
			.join("&")

		const tranzilaApiHost = "secure5.tranzila.com"
		const tranzilaApiPath = "/cgi-bin/tranzila71u.cgi"
		const url = `https://${tranzilaApiHost}${tranzilaApiPath}`

		return axios
			.post(url, queryString, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Disable SSL verification (not recommended for production)
			})
			.then((response) => {
				const result = response.data

				// Preparing associative array with response data
				const responseArray = result.split("&")
				const responseAssoc = {}

				for (const value of responseArray) {
					const [key, val] = value.split("=")
					responseAssoc[key] = val
				}

				// Analyze the result string
				if (!responseAssoc["Response"]) {
					console.log("result_1111", result)
					/**
					 * When there is no 'Response' parameter it either means
					 * that some pre-transaction error happened (like authentication
					 * problems), in which case the result string will be in HTML format,
					 * explaining the error, or the request was made for generate token only
					 * (in this case the response string will contain only 'TranzilaTK'
					 * parameter)
					 */
				} else if (responseAssoc["Response"] !== "000") {
					console.log(responseAssoc["Response"])
					// Any other than '000' code means transaction failure
					// (bad card, expiry, etc..)
				} else {
					console.log("Success")
					console.log('responseAssoc["Response"]--->', responseAssoc["Response"])
					console.log("result2222", result)
					return result
				}
			})
			.catch((error) => {
				console.error(error)
			})
	}

	async create_order_db(req, res) {
		const orderData = req.body
		// const timeOrder =   generateDateTime()
		const timeOrder = new Date()

		const values = [
			orderData.queryId,
			JSON.stringify(orderData.cartItems),
			orderData.comment,
			orderData.totalPrice,
			orderData.address,
			orderData.optionDelivery,
			orderData.user_id,
			orderData.user_name,
			timeOrder,
			// orderData.order_date,
			orderData.paymentMethod,
		]

		const sqlQuery = `INSERT INTO orders 
                      (queryId, cartItems, comment, totalPrice, address, optionDelivery, user_id, user_name, order_date, paymentMethod) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

		try {
			const result = await this.executeQuery(sqlQuery, values)

			console.log('"create_order_db_ Заказ успешно создан" ')
			return result
		} catch (error) {
			console.error("create_order_db Ошибка при создании заказа:", error)
			throw error
		}
	}
}

module.exports = new OrdersService()
