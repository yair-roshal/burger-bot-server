const mysql = require("mysql2/promise");
const { sqlConfig } = require("../../constants/config");
const axios = require("axios");
const https = require("https");
const { generateDateTime } = require("../helpers/utils");
const cloudinary = require("cloudinary").v2;
const { options } = require("../../constants/constants");

cloudinary.config({
	cloud_name: "dvb3cxb9h",
	api_key: "983895153435419",
	api_secret: "Poz4uTvsD0TKuZiXfAIT3Sk_9gc",
});

class dishesService {
	constructor() {
		this.pool = mysql.createPool(sqlConfig); // Создаем пул соединений
	}

	// Метод для выполнения запросов к базе данных
	async executeQuery(sqlQuery, values) {
		const connection = await this.pool.getConnection();

		try {
			const [results] = await connection.execute(sqlQuery, values);
			return results;
		} catch (error) {
			console.error("Error executing SQL query:", error);
			throw error;
		} finally {
			connection.release(); // Вернуть соединение в пул после использования
		}
	}
 
	// createDish ================================================

	async createDish(req, res) {
		console.log("req.body :>> ", req.body);
		const { title, price, image, description, toppings, restaurant_id } = req.body;
		const sqlQuery = `
        INSERT INTO dishes (title, price, image, description, restaurant_id)
        VALUES (?, ?, ?, ?, ?)
      `;

		try {
			let values = [title, price, image, description, restaurant_id];
 
			if (image) {
				const uploadedResponse = await cloudinary.uploader.upload(image, options);
				console.log("uploadedResponse", uploadedResponse);

				if (uploadedResponse) {
					values = [
						title,
						price,
						uploadedResponse.secure_url,
						description,
						restaurant_id,
					];
				}
			}

			// Insert the dish into the 'dishes' table
			const result = await this.executeQuery(sqlQuery, values);

			// If toppings are provided, insert them into the 'toppings' table
			if (toppings && toppings.length > 0) {
				const dishId = result.insertId;
				await this.insertToppings(dishId, toppings);
			}

			return result;
		} catch (error) {
			console.error("Error creating dish:", error);
			throw error;
		}
	}

	// Helper method to insert toppings for a dish
	async insertToppings(dishId, toppings) {
		const sqlQuery = `
      INSERT INTO dishes_toppings (dish_id, topping_id)
      VALUES (?, ?)
    `;

		toppings.forEach(async (topping) => {
			const values = [dishId, topping.id];
			try {
				// Insert relationship between dish and topping into the 'dishes_toppings' table
				await this.executeQuery(sqlQuery, values);
			} catch (error) {
				console.error("Error inserting toppings:", error);
				throw error;
			}
		});
	}

 

	// getDishes ================================================

	async getDishes(restaurant_id) {
		console.log("restaurant_id", restaurant_id);

		const dishesQuery = `
        SELECT
            d.id AS id,
            d.title AS title,
            d.price AS price,
            d.description AS description,
            d.image AS image,
            d.restaurant_id AS restaurant_id
        FROM dishes d
        WHERE d.restaurant_id = ?;
    `;

		const dishesResult = await this.executeQuery(dishesQuery, [restaurant_id]);

		const toppingsQuery = `
        SELECT
            d.id AS id,
            CASE
                WHEN COUNT(t.id) = 0 THEN JSON_ARRAY()
                ELSE JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', t.id,
                        'title', t.title,
                        'price', t.price,
                        'image', t.image
                    )
                )
            END AS toppings
        FROM dishes d
        LEFT JOIN dishes_toppings dt ON d.id = dt.dish_id
        LEFT JOIN toppings t ON dt.topping_id = t.id
        WHERE d.restaurant_id = ?
        GROUP BY d.id;
    `;

		const toppingsResult = await this.executeQuery(toppingsQuery, [restaurant_id]);

		const extrasQuery = `
        SELECT
            d.id AS id,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', e.id,
                    'title', e.title,
                    'image', e.image,
                    'restaurant_id', e.restaurant_id,
                    'type', e.type
                )
            ) AS extras
        FROM dishes d
        LEFT JOIN dishes_extra de ON d.id = de.dish_id
        LEFT JOIN extra e ON de.extra_id = e.id
        WHERE d.restaurant_id = ?
        GROUP BY d.id;
    `;

		const extrasResult = await this.executeQuery(extrasQuery, [restaurant_id]);

		const combinedData = dishesResult.map((dish) => {
			const toppings = toppingsResult.find((item) => item.id === dish.id);
			const extras = extrasResult.find((item) => item.id === dish.id);

			return {
				id: dish.id,
				title: dish.title,
				price: dish.price,
				description: dish.description,
				image: dish.image,
				restaurant_id: dish.restaurant_id,
				toppings: toppings.toppings,
				extras: extras.extras,
			};
		});

		return combinedData;
	}

 
 

	// getCategories ================================================
	async getCategories() {
		const sqlQuery = "SELECT * FROM categories";
		return this.executeQuery(sqlQuery, []);
	}

	// updateDish ================================================

	async updateDish(req, res) {
		const dish_id = req.params.dish_id;
		console.log("dish_id :>> ", dish_id);
		console.log("req.body :>> ", req.body);
		const { id, title, price, image, description, toppings, restaurant_id } = req.body;
		const sqlQuery = `
    UPDATE dishes 
    SET title = ?, price = ?, image = ?, description = ? 
    WHERE id = ? AND restaurant_id = ?
  `;

		try {
			let values = [title, price, image, description, id, restaurant_id];

			const options = {
				use_filename: true,
				unique_filename: false,
				overwrite: true,
			};

			if (image) {
				const uploadedResponse = await cloudinary.uploader.upload(image, options);
				console.log("uploadedResponse", uploadedResponse);

				if (uploadedResponse) {
					values = [
						title,
						price,
						uploadedResponse.secure_url,
						description,
						id,
						restaurant_id,
					];
				}
			}

			// Update the dish in the 'dishes' table
			const result = await this.executeQuery(sqlQuery, values);

			// If toppings are provided, update them in the 'dishes_toppings' table
			if (toppings && toppings.length > 0) {
				await this.updateToppings(id, toppings);
			}

			return result;
		} catch (error) {
			console.error("Error updating dish:", error);
			throw error;
		}
	}

	// Helper method to update toppings for a dish
	async updateToppings(dishId, toppings) {
		const deleteQuery = `DELETE FROM dishes_toppings WHERE dish_id = ?`;
		const insertQuery = `INSERT INTO dishes_toppings (dish_id, topping_id) VALUES (?, ?)`;

		const connection = await this.pool.getConnection();

		try {
			await connection.beginTransaction();

			// Delete existing toppings for the dish
			await connection.execute(deleteQuery, [dishId]);

			// Insert updated toppings for the dish
			for (const topping of toppings) {
				const values = [dishId, topping.id];
				await connection.execute(insertQuery, values);
			}

			await connection.commit();
		} catch (error) {
			await connection.rollback();
			console.error("Error updating toppings:", error);
			throw error;
		} finally {
			connection.release();
		}
	}

	// deleteDish ================================================
	async deleteDish(req, res) {
		const dishId = req.params.dish_id;

		const deleteDishQuery = "DELETE FROM dishes WHERE id = ?";

		try {
			const result = await this.executeQuery(deleteDishQuery, [dishId]);
			return result;
		} catch (error) {
			console.error("Error deleting dish:", error);
			throw error;
		}
	}
}

module.exports = new dishesService();
