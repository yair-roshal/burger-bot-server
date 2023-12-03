const mysql = require("mysql2/promise");
const { sqlConfig } = require("../../constants/sqlConfig");

const cloudinary = require("cloudinary").v2;
const { options } = require("../../constants/constants");
const { isPhotoUrl } = require("../helpers/isPhotoUrl");

cloudinary.config({
  cloud_name: "dvb3cxb9h",
  api_key: "983895153435419",
  api_secret: "Poz4uTvsD0TKuZiXfAIT3Sk_9gc",
});

class dishesService {
  constructor() {
	console.log('sqlConfig', sqlConfig)
    this.pool = mysql.createPool(sqlConfig); // Создаем пул соединений
  }

  // Метод для выполнения запросов к базе данных
  async executeQuery(sqlQuery, values) {
    const connection = await this.pool.getConnection();

    try {
      const [results] = await connection.execute(sqlQuery, values);
	  console.error("Executing SQL query was success - results :", results);

      return results;
    } catch (error) {
      console.error("Error executing SQL query:", error);
      throw error;
    } finally {
      connection.release(); // Вернуть соединение в пул после использования
    }
  }

  // getToppings ================================================
  async getToppings(req, res) {
    const restaurant_id = req.params.restaurant_id;

    console.log("getToppings_restaurant_id", restaurant_id);
    const sqlQuery = `
		  SELECT
			t.id  , 
			t.title,
			t.price,
			t.image,
			t.restaurant_id
		  FROM toppings t
		  WHERE t.restaurant_id = ?
		`;
    return this.executeQuery(sqlQuery, [restaurant_id]);
  }

  // createTopping ================================================

  async createTopping(req, res) {
    console.log("req.body :>> ", req.body);
    const { title, price, image, restaurant_id } = req.body;
    const sqlQuery = `
          INSERT INTO toppings (title, price, image, restaurant_id)
          VALUES (?, ?, ?, ?)
        `;

    try {
      let values = [title, price, image, restaurant_id];

      if (image && isPhotoUrl(image)) {
        const uploadedResponse = await cloudinary.uploader.upload(
          image,
          options
        );
        console.log("uploadedResponse", uploadedResponse);

        if (uploadedResponse) {
          values = [title, price, uploadedResponse.secure_url, restaurant_id];
        }
      }

      const result = await this.executeQuery(sqlQuery, values);

      return result;
    } catch (error) {
      console.error("Error creating topping:", error);
      throw error;
    }
  }

  // updateTopping ================================================

  async updateTopping(req, res) {
    const { id, title, price, image, restaurant_id } = req.body;
    const sqlQuery = `
        UPDATE toppings
        SET title = ?, price = ?, image = ?, restaurant_id = ?
        WHERE id = ?
    `;

    try {
      let values = [title, price, image, restaurant_id, id];

      if (image && isPhotoUrl(image)) {
        const uploadedResponse = await cloudinary.uploader.upload(
          image,
          options
        );
        console.log("uploadedResponse", uploadedResponse);

        if (uploadedResponse) {
          values = [
            title,
            price,
            uploadedResponse.secure_url,
            restaurant_id,
            id,
          ];
        }
      }

      const result = await this.executeQuery(sqlQuery, values);

      return result;
    } catch (error) {
      console.error("Error updating topping:", error);
      throw error;
    }
  }

  // deleteTopping ================================================

  async deleteTopping(req, res) {
    // const { id } = req.params;
    const id = req.params.topping_id;

    // console.log('req.body222', req.body)
    // console.log('topping_id', topping_id)
    console.log("id", id);
    console.log("req.params", req.params);

    const sqlQuery = `
        DELETE FROM toppings
        WHERE id = ?
    `;

    try {
      const result = await this.executeQuery(sqlQuery, [id]);

      return result;
    } catch (error) {
      console.error("Error deleting topping:", error);
      throw error;
    }
  }
}

module.exports = new dishesService();
